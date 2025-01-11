import { FastifyReply } from "fastify";
import { FactSearchGetReq, FactSearchGetSchema } from "./types/FactSearchArgs";

async function factsGetHandler(req: FactSearchGetReq, reply: FastifyReply) {
  const { server, query } = req;
  const { factService } = server.services;
  const currentPage = parseInt(query.page ?? "1");
  const [factRes, totalFacts] = await factService.getFacts({
    ...query,
    page: currentPage - 1,
  });
  const facts = factRes.map((fact) => ({
    ...fact,
  }));
  const pagination = buildPagination(currentPage, query, totalFacts);
  return reply.view("admin/fact/index.hbs", {
    facts,
    pagination,
    search: query.search,
    sortBy: query.sortBy ?? "createdAt",
  });
}

type PaginationElement = {
  text: string | number;
  isIcon?: boolean;
  href?: string;
};

function buildPagination(currentPage: number, query: Record<string, string>, totalFacts: number) {
  const prevButtons: PaginationElement[] = [];
  const prevNumbers: PaginationElement[] = [];
  const nextButtons: PaginationElement[] = [];
  const nextNumbers: PaginationElement[] = [];
  const currentPageElement = {
    text: currentPage,
  };
  const params = new URLSearchParams(query);
  if (!params.get("page")) {
    params.append("page", "1");
  }

  if (currentPage > 2) {
    params.set("page", "1");
    prevButtons.push({
      text: "chevron_left chevron_left",
      isIcon: true,
      href: getPageHref(params),
    });
    params.set("page", (currentPage - 2).toString());
    prevNumbers.push({
      text: currentPage - 2,
      isIcon: false,
      href: getPageHref(params),
    });
  }

  if (currentPage > 1) {
    params.set("page", (currentPage - 1).toString());
    prevButtons.push({
      text: "chevron_left",
      isIcon: true,
      href: getPageHref(params),
    });
    prevNumbers.push({
      text: currentPage - 1,
      isIcon: false,
      href: getPageHref(params),
    });
  }

  const totalPages = Math.ceil(totalFacts / 10);

  if (currentPage < totalPages) {
    params.set("page", (currentPage + 1).toString());
    nextButtons.push({
      text: "chevron_right",
      isIcon: true,
      href: getPageHref(params),
    });
    nextNumbers.push({
      text: currentPage + 1,
      isIcon: false,
      href: getPageHref(params),
    });
  }

  if (currentPage < totalPages - 1) {
    params.set("page", totalPages.toString());
    nextButtons.push({
      text: "chevron_right chevron_right",
      isIcon: true,
      href: getPageHref(params),
    });
    params.set("page", (currentPage + 2).toString());
    nextNumbers.push({
      text: currentPage + 2,
      isIcon: false,
      href: getPageHref(params),
    });
  }

  return [...prevButtons, ...prevNumbers, currentPageElement, ...nextNumbers, ...nextButtons];
}

function getPageHref(params: URLSearchParams) {
  return `/admin/facts?${params.toString()}`;
}

export const factsSearchGetRoute = {
  url: "/admin/facts",
  method: "GET",
  schema: FactSearchGetSchema,
  handler: factsGetHandler,
};
