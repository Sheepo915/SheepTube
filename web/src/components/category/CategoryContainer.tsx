import { Category } from "../../types/content.types";
import { Chip } from "../utils/Chip";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCategory } from "../../redux/features/categoryChip/categoryChipSlice";
import { ChipScroller } from "./ChipScroller";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface CategoryContainerProps {
  categoryList: Category[];
}

const TRANSLATE_AMOUNT = 200;

export function CategoryContainer({ categoryList }: CategoryContainerProps) {
  const { selectedIndex } = useAppSelector((state) => state.categoryChip);
  const dispatch = useAppDispatch();

  const containerRef = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState<number>(0);
  const [isLeftVisible, setIsLeftVisible] = useState<boolean>(false);
  const [isRightVisible, setIsRightVisible] = useState<boolean>(false);

  function toggleCategory(index: number) {
    return () => {
      dispatch(selectCategory(index));
    };
  }

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categoryList, translate]);

  return (
    <div className="sticky top-0 z-10 | dark:bg-neutral-800 | pb-4">
      <div ref={containerRef} className="overflow-hidden relative">
        <div
          className="flex gap-3 | w-[max-content] | whitespace-nowrap | transition-transform"
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {categoryList.map(({ title }, index) => (
            <Chip
              key={title}
              text={title}
              isActive={selectedIndex == index}
              onClick={toggleCategory(index)}
            />
          ))}
        </div>
        {isLeftVisible && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 | flex | bg-gradient-to-r dark:from-neutral-800 from-50% to-transparent | w-24 h-full">
            <ChipScroller
              Icon={ChevronLeftIcon}
              onClick={() => {
                setTranslate((translate) => {
                  const newTranslate = translate - TRANSLATE_AMOUNT;
                  if (newTranslate <= 0) return 0;
                  return newTranslate;
                });
              }}
            />
          </div>
        )}
        {isRightVisible && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 | flex justify-end | bg-gradient-to-l dark:from-neutral-800 from-50% to-transparent | w-24 h-full">
            <ChipScroller
              Icon={ChevronRightIcon}
              onClick={() => {
                setTranslate((translate) => {
                  if (containerRef.current == null) {
                    return translate;
                  }
                  const newTranslate = translate + TRANSLATE_AMOUNT;
                  const edge = containerRef.current.scrollWidth;
                  const width = containerRef.current.clientWidth;
                  if (newTranslate + width >= edge) {
                    return edge - width;
                  }
                  return newTranslate;
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
