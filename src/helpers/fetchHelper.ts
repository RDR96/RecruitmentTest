export async function api<T>(url: string): Promise<T> {
  try {
    const data = await fetch(url);
    return data.json() as Promise<T>;
  } catch (error) {
    return error;
  }
}
