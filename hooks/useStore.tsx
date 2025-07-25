'use client';

export function useStore(payload: any) {
  if (typeof window != 'undefined') {
    localStorage.setItem('access', JSON.stringify(payload));
    return {
      status: 200,
      message: 'successfully added',
    };
  }
}

export function useGetAccessFromStore() {
  if (typeof window != 'undefined') {
    localStorage.getItem('access');
    const data = localStorage.getItem('access');
    if (data) {
      return {
        status: 200,
        message: 'successfully fetched',
        data: JSON.parse(data),
      };
    } else {
      return { status: 404, message: 'No data found' };
    }
  }
}
