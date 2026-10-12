import prisma from "../lib/prisma";

export async function getAuditLogs(
  page = 1,
  limit = 10,
  search = "",
  sort: "asc" | "desc" = "desc"
) {
  const where = {
    ...(search && {
      OR: [
        {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    }),
  };

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: sort,
      },
    }),

    prisma.auditLog.count({
      where,
    }),
  ]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}