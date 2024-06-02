export function createPagination(totalPages: number, page: number) {
    let pages: any = [];
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 1) {
        pages.push({ type: 'prev', number: page - 1 });
    }

    if (page > 2) {
        pages.push({ type: 'page', number: 1 });
        if (page > 3) {
            pages.push({ type: 'dots' });
        }
    }

    if (page === totalPages) {
        beforePage = beforePage - 2;
    } else if (page === totalPages - 1) {
        beforePage = beforePage - 1;
    }

    if (page === 1) {
        afterPage = afterPage + 2;
    } else if (page === 2) {
        afterPage = afterPage + 1;
    }

    for (let i = beforePage; i <= afterPage; i++) {
        if (i > 0 && i <= totalPages) {
            pages.push({ type: 'page', number: i });
        }
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            pages.push({ type: 'dots' });
        }
        pages.push({ type: 'page', number: totalPages });
    }

    if (page < totalPages) {
        pages.push({ type: 'next', number: page + 1 });
    }
    return pages;
}