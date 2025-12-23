"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import axiosClient from "@/components/axiosClient";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/state/slices/user.slice";

const TwoFAForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);

  const tempToken = searchParams.get("tempToken") || null;

  useEffect(() => {
    if (!tempToken) {
      toast.error("No 2FA session found, please login again");
      router.push("/login");
    } 
    // else {
    //   fetchQRCode();
    // }
  }, [tempToken]);

  const fetchQRCode = async () => {
    try {
      const { data } = await axiosClient.get("/payroll/auth/2fa/setup", {
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      if (data?.data) {
        setQrCode(data.data.qrcode);
        setSecret(data.data.secret);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("2FA token is required");
      return;
    }

    setIsLoading(true);
    try {
      const { data: response } = await axiosClient.post(
        "/payroll/auth/2fa/authenticate",
        { token },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );

      if (!response?.success) {
        toast.error(response?.message || "2FA verification failed");
        return;
      }

      dispatch(
        loginSuccess({
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken,
          twoFaAuthenticated: response?.data?.data?.twoFaAuthenticated,
          data: {
            user: response?.data?.data?.user,
            companyId: response?.data?.hasCompany && response?.data?.companyId,
            hasCompany: response?.data?.hasCompany,
          },
        })
      );

      toast.success("2FA authentication successful");
      router.push("/overview");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "2FA failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axiosClient.post(
        "/payroll/auth/2fa/resend",
        {},
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );
      toast.success("2FA token resent successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to resend";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-300 p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">
          Two-Factor Authentication
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Enter the authentication code from your 2FA app.
        </p>

        {qrCode && (
          <div className="mb-6 flex flex-col items-center">
            <img src={qrCode} alt="QR Code" className="w-40 h-40 mb-2" />
            <p className="text-gray-500 text-sm">Scan QR to setup 2FA</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-black" />
            </div>
            <Input
              type={showToken ? "text" : "password"}
              name="token"
              placeholder="Enter 2FA code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="pl-10 pr-10 h-12 bg-white rounded-sm border border-gray-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? <FaEyeSlash className="h-4 w-4 text-black" /> : <FaEye className="h-4 w-4 text-black" />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-medium rounded-sm">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </Button>
        </form>

        {/* <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-black hover:underline font-medium"
          >
            Resend Code
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TwoFAForm;
