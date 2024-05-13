import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

interface ContentMetadataProps {
  title: string;
  creatorName: string;
  views: number;
  uploadTime: Date;
  isVerified: boolean;
}

interface timeUnit {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const FORMATTER = {
  viewFormatter: Intl.NumberFormat("en", { notation: "compact" }),
  timeFormatter: new Intl.RelativeTimeFormat("en", { numeric: "auto", style: "long" }),
};

export function ContentMetadata({
  title,
  creatorName,
  views,
  uploadTime,
  isVerified,
}: ContentMetadataProps) {
  const elapsedTime = useMemo(() => {
    let timeElapsedInSeconds = Math.floor((Date.now() - uploadTime.getTime()) / 1000);
    const timeUnits: timeUnit[] = [
      { value: 60, unit: "second" },
      { value: 60, unit: "minute" },
      { value: 24, unit: "hour" },
      { value: 30, unit: "day" },
      { value: 12, unit: "month" },
      { value: Infinity, unit: "year" },
    ];

    for (const { value, unit } of timeUnits) {
      if (timeElapsedInSeconds < value) {
        return FORMATTER.timeFormatter.format(Math.floor(timeElapsedInSeconds), unit);
      }
      timeElapsedInSeconds /= value;
    }
  }, [uploadTime]);

  return (
    <div className="select-none">
      <h3 className="line-clamp-2 leading-tight | cursor-pointer">{title}</h3>
      <div>
        <div className="flex items-center space-x-1.5 | h-[1lh] |">
          <a href="">{creatorName}</a>
          {isVerified && <CheckBadgeIcon className="h-4/5 aspect-square | text-blue-400" />}
        </div>
        <div className="space-x-2">
          <span>{FORMATTER.viewFormatter.format(views)}</span>
          <span>*</span>
          <span>{elapsedTime}</span>
        </div>
      </div>
    </div>
  );
}
