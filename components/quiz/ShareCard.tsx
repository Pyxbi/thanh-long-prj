'use client'

import { useEffect, useRef, useState } from "react";
import { Coffee, Download, Footprints, Package, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type AnswerColor, shareCards } from "./quiz-data";

export function ResultShareCard({ color }: { color: AnswerColor }) {
  const t = useTranslations("Quiz");
  const fallback = shareCards[color];
  const shareData = t.raw("share") as {
    youAre?: string;
    vitalityIndex?: string;
    luckyItemTitle?: string;
    footer?: string;
    cards?: Record<AnswerColor, {
      name: string;
      subtitle: string;
      tags: string[];
      archetype: string;
      initials: string;
      percentage: string;
      metric: string;
      luckyItem: string;
    }>;
  } | undefined;

  const card = shareData?.cards?.[color] || fallback;
  const youAre = shareData?.youAre || "Bạn là...";
  const vitalityIndex = shareData?.vitalityIndex || "Chỉ số sống trọn ngày";
  const luckyItemTitle = shareData?.luckyItemTitle || "Vật may mắn trong ngày";
  const footerText = shareData?.footer || "Sống trọn một ngày cùng Long Gia";

  return (
    <div className={`share-art share-art--${color}`} data-testid="share-art">
      <div className="share-art__top">
        {/* Upper left is reserved for the final Long Gia logo. */}
        <div className="share-art__spotlight" aria-hidden="true" />
        <img className="share-art__mascot" src={fallback.mascot} alt={`Nhân vật ${card.name}`} crossOrigin="anonymous" />
        <div className="share-art__intro">
          <span>{youAre}</span>
          <strong>{card.name}</strong>
          <b>{card.subtitle}</b>
          <div className="share-art__tags">{card.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
      <div className="share-art__bottom">
        <div className="share-art__chart">
          <h3>{vitalityIndex}</h3>
          <img src={fallback.chart} alt={`Biểu đồ chỉ số sống trọn ngày của ${card.name}`} crossOrigin="anonymous" />
        </div>
        <div className="share-art__facts">
          <div className="share-art__fact share-art__fact--dark">
            <span className="share-art__number">1</span>
            <strong>{card.archetype}</strong>
            <small>{card.initials}</small>
          </div>
          <div className="share-art__fact">
            <span className="share-art__number">2</span>
            <strong className="share-art__percent">{card.percentage}</strong>
            <span>{card.metric}</span>
          </div>
          <div className="share-art__fact share-art__fact--lucky">
            <span className="share-art__number">3</span>
            <strong>{luckyItemTitle}</strong>
            <span><span className="share-art__lucky-icon">{color === "red" ? <Footprints /> : color === "yellow" ? <Package /> : <Coffee />}</span>{card.luckyItem} <i>✦</i></span>
          </div>
        </div>
      </div>
      <div className="share-art__footer">{footerText}</div>
    </div>
  );
}

export function SharePreview({ color, open, onOpenChange }: { color: AnswerColor; open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("Quiz");
  const frameRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;

    const updateScale = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const availableWidth = Math.min(frame.clientWidth || 760, frame.parentElement?.clientWidth ?? frame.clientWidth);
      const maxWidth = Math.min(availableWidth, 1040);
      const maxHeight = Math.max(320, window.innerHeight - 190);
      
      const scaleW = maxWidth / 760;
      const scaleH = maxHeight / 760;
      
      setScale(Math.max(0.35, Math.min(1.2, scaleW, scaleH)));
    };

    const observer = new ResizeObserver(updateScale);
    const observeFrame = () => {
      if (frameRef.current) observer.observe(frameRef.current);
      updateScale();
    };
    window.addEventListener("resize", updateScale);

    const frameUpdate = window.requestAnimationFrame(observeFrame);
    const settledUpdate = window.setTimeout(observeFrame, 180);
    observeFrame();
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
      window.cancelAnimationFrame(frameUpdate);
      window.clearTimeout(settledUpdate);
    };
  }, [open]);

  const createImage = async () => {
    const node = artRef.current;
    if (!node) return null;
    await Promise.all(Array.from(node.querySelectorAll("img")).map(img => img.decode().catch(() => undefined)));
    await document.fonts.ready;
    return toBlob(node, { width: 760, height: 760, pixelRatio: 2, cacheBust: true, style: { transform: "none" } });
  };

  const download = async () => {
    setBusy(true);
    try {
      const blob = await createImage();
      if (!blob) throw new Error("Image could not be created");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `long-gia-${color}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success(t("resultSave"));
    } catch {
      toast.error("Error saving image");
    } finally { setBusy(false); }
  };

  const share = async () => {
    setBusy(true);
    try {
      const blob = await createImage();
      if (!blob) throw new Error("Image could not be created");
      const file = new File([blob], `long-gia-${color}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: t("shareTitle") });
      } else {
        toast(t("resultSave"));
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") toast.error("Error sharing image");
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95dvh] overflow-x-hidden overflow-y-auto p-4 sm:max-w-[1100px] sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("shareTitle")}</DialogTitle>
          <DialogDescription>{t("resultSave")}</DialogDescription>
        </DialogHeader>
        <div className="flex min-w-0 w-full justify-center overflow-hidden" ref={frameRef} data-testid="share-preview-frame">
          <div style={{ width: `${760 * scale}px`, height: `${760 * scale}px`, flexShrink: 0, overflow: 'hidden', borderRadius: `${1.5 * scale}rem` }}>
            <div ref={artRef} style={{ width: 760, height: 760, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <ResultShareCard color={color} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={share} disabled={busy}><Share2 /> {t("shareTitle")}</Button>
          <Button onClick={download} disabled={busy}><Download /> {t("resultSave")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
