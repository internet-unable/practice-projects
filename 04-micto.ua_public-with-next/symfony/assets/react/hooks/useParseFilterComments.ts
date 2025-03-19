import {
  CommentOrderField,
  OrderDirection,
  TypeOfComment,
} from "@/Types/cabinetTypes";
import qs from "qs";

export const useParseFilterComments = (search: string) => {
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  const typeOfComment = query.typeOfComment
    ? String(query.typeOfComment)
        .split(",")
        .filter((type): type is TypeOfComment =>
          Object.values(TypeOfComment).includes(type as TypeOfComment)
        )
    : [];

  const date =
    query.dateFrom || query.dateTo
      ? {
          from: query.dateFrom ? new Date(String(query.dateFrom)) : undefined,
          to: query.dateTo ? new Date(String(query.dateTo)) : undefined,
        }
      : undefined;

  const sort =
    query["sort[field]"] && query["sort[direction]"]
      ? {
          field: Object.values(CommentOrderField).includes(
            query["sort[field]"] as CommentOrderField
          )
            ? (query["sort[field]"] as CommentOrderField)
            : undefined,
          direction: Object.values(OrderDirection).includes(
            query["sort[direction]"] as OrderDirection
          )
            ? (query["sort[direction]"] as OrderDirection)
            : undefined,
        }
      : undefined;

  return { typeOfComment, date, sort };
};
