import React from "react";
import { CommentType } from "@/Types/cabinetTypes";

interface IPropsCommentTag {
  type: CommentType;
}

const CommentTag: React.FC<IPropsCommentTag> = ({ type }) => {
  if (type === CommentType.REVIEW) {
    return (
      <span className="flex items-center justify-center w-[81px] h-[30px] bg-[var(--color22)] fontRegular text-[var(--white)] rounded-[var(--default-round)] mb-1 mt-2">
        Відгук
      </span>
    );
  }

  if (type === CommentType.COMPLAINT) {
    return (
      <span className="flex items-center justify-center w-[81px] h-[30px] bg-[var(--error)] fontRegular text-[var(--white)] rounded-[var(--default-round)] mb-1 mt-2">
        Скарга
      </span>
    );
  }

  if (type === CommentType.QUESTION) {
    return (
      <span className="flex items-center justify-center w-[81px] h-[30px] bg-[var(--color22)] fontRegular text-[var(--white)] rounded-[var(--default-round)] mb-1 mt-2">
        Питання
      </span>
    );
  }

  if (type === CommentType.REPLY) {
    return (
      <span className="flex items-center justify-center w-[81px] h-[30px] bg-[var(--color22)] fontRegular text-[var(--white)] rounded-[var(--default-round)] mb-1 mt-2">
        Відповідь
      </span>
    );
  }

  if (type === CommentType.GRATITUDE) {
    return (
      <span className="flex items-center justify-center w-[81px] h-[30px] bg-[var(--color21)] fontRegular text-[var(--white)] rounded-[var(--default-round)] mb-1 mt-2">
        Подяка
      </span>
    );
  }
};

export default CommentTag;
