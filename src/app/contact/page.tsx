"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;

    // ✅ 네가 받은 Formspree 엔드포인트
    const endpoint = "https://formspree.io/f/xnnzyykl";

    const data = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-gray-600 mt-2">
        For artwork inquiries, acquisitions, commissions, or exhibition invitations & collaborations:
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="_subject" value="[Choi Mijin] Website Inquiry" />

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea name="message" rows={6} required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>

        {status === "success" && (
          <p className="text-emerald-600 text-sm mt-2">Your message has been sent. Thank you!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm mt-2">Failed to send. Please try again.</p>
        )}
      </form>

      <p className="text-xs text-gray-500 mt-6">
        We use Formspree to process this form. By submitting, you agree to the processing of your data
        for the purpose of responding to your inquiry.
      </p>
    </div>
  );
}
