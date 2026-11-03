"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FieldError from "./FieldError";
import styles from "./forms.module.css";

const CODE_LENGTH = 5;
const W = 176;
const H = 54;
const VERIFY_DELAY_MS = 450;
const RETRY_DELAY_MS = 700;

type Status = "idle" | "verifying" | "success" | "error";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  message?: string;
  id: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) code += Math.floor(Math.random() * 10);
  return code;
}

/** Number captcha: image me dikhe digits type karke verify karna hota hai. */
export default function HumanCheck({ checked, onChange, message, id }: Props) {
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // parent ka onChange inline ho tab bhi stable rahe
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    setCode(makeCode());
    setValue("");
    setStatus("idle");
    onChangeRef.current(false);
  }, []);

  // pehli baar client pe code banao (hydration mismatch se bachne ke liye)
  useEffect(() => {
    reset();
    return () => clearTimeout(timer.current);
  }, [reset]);

  // ---- canvas draw ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !code) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#f5f3ff");
    bg.addColorStop(1, "#eef2ff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `hsla(${rand(230, 290)}, 40%, 60%, 0.5)`;
      ctx.lineWidth = rand(1, 1.8);
      ctx.beginPath();
      ctx.moveTo(rand(0, W), rand(0, H));
      ctx.bezierCurveTo(rand(0, W), rand(0, H), rand(0, W), rand(0, H), rand(0, W), rand(0, H));
      ctx.stroke();
    }

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const step = W / (CODE_LENGTH + 1);
    code.split("").forEach((digit, i) => {
      ctx.save();
      ctx.translate(step * (i + 1), H / 2 + rand(-5, 5));
      ctx.rotate(rand(-0.4, 0.4));
      ctx.font = `700 ${Math.round(rand(26, 31))}px "Courier New", monospace`;
      ctx.fillStyle = `hsl(${rand(240, 285)}, 50%, ${rand(22, 34)}%)`;
      ctx.fillText(digit, 0, 0);
      ctx.restore();
    });

    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `hsla(${rand(230, 290)}, 45%, 40%, 0.55)`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(rand(0, 20), rand(8, H - 8));
      ctx.lineTo(rand(W - 20, W), rand(8, H - 8));
      ctx.stroke();
    }

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `hsla(${rand(230, 290)}, 45%, 45%, 0.45)`;
      ctx.beginPath();
      ctx.arc(rand(0, W), rand(0, H), rand(0.6, 1.4), 0, Math.PI * 2);
      ctx.fill();
    }
  }, [code, status]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === "verifying" || status === "success") return;

    const next = e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setValue(next);
    if (status === "error") setStatus("idle");
    if (next.length < CODE_LENGTH) return;

    if (next === code) {
      setStatus("verifying");
      timer.current = setTimeout(() => {
        setStatus("success");
        onChangeRef.current(true);
      }, VERIFY_DELAY_MS);
    } else {
      setStatus("error");
      timer.current = setTimeout(() => {
        setCode(makeCode());
        setValue("");
      }, RETRY_DELAY_MS);
    }
  }

  const errorMessage =
    status === "error"
      ? "Incorrect code. We've generated a new one, please try again."
      : status === "success" || status === "verifying"
        ? undefined
        : message;

  const done = status === "success" || checked;

  return (
    <div className={styles.human}>
      <div
        className={styles.humanBox}
        data-state={done ? "success" : status}
        data-invalid={Boolean(errorMessage)}
      >
        <div className={styles.captchaHead}>
          <span className={styles.captchaShield} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
              <path d="M8.5 12l2.5 2.5L15.5 10" />
            </svg>
          </span>
          <div className={styles.captchaText}>
            <span className={styles.captchaTitle}>Security verification</span>
            <span className={styles.captchaSub}>
              {done ? "Human verification complete" : "Enter the code shown below"}
            </span>
          </div>
          {!done && (
            <button
              type="button"
              onClick={reset}
              className={styles.captchaRefresh}
              aria-label="Get a new code"
              title="New code"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                <path d="M20 4v5h-5" />
              </svg>
            </button>
          )}
        </div>

        {done ? (
          <div className={styles.captchaSuccess} role="status">
            <span className={styles.successIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 12.5l4 4 8-9" />
              </svg>
            </span>
            <div className={styles.successText}>
              <strong>Verified</strong>
              <span>You&apos;re all set, you can submit the form.</span>
            </div>
            <button type="button" onClick={reset} className={styles.captchaLink}>
              Reset
            </button>
          </div>
        ) : (
          <div className={styles.captchaRow}>
            <canvas
              ref={canvasRef}
              className={styles.captchaCanvas}
              style={{ width: W, height: H }}
              role="img"
              aria-label="Captcha code"
            />
            <div className={styles.captchaField}>
              <input
                name="human"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter code"
                value={value}
                onChange={handleInput}
                disabled={status === "verifying"}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? id : undefined}
                className={styles.captchaInput}
              />
              {status === "verifying" && (
                <span className={styles.captchaSpinner} aria-hidden="true" />
              )}
            </div>
          </div>
        )}
      </div>
      <FieldError id={id} message={errorMessage} />
    </div>
  );
}