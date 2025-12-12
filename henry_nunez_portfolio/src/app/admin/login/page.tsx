"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import Button from "@/app/components/Button/Button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/messages");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginCard}>
        <h1 className={classes.title}>Admin Login</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter admin password"
            />
          </div>
          {error && <div className={classes.error}>{error}</div>}
          <Button
            text={isLoading ? "Logging in..." : "Login"}
            type="submit"
            variant="primary"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
