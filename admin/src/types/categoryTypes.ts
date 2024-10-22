interface CategoryResultItem {
    _id: string;
    name: string;
    status: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryResults {
    totalUser: number;
    pageCount: number;
    pageindex: number;
    result: CategoryResultItem[];
}

interface CategoryData {
    success: boolean;
    message: string;
    results: CategoryResults;
}

interface Error {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}
export {}