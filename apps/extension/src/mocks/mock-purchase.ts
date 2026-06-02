export interface MockPurchaseOptions {
  shouldFail?: { message: string }
}

export async function runMockPurchase(
  options?: MockPurchaseOptions,
): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  if (options?.shouldFail) {
    throw new Error(options.shouldFail.message);
  }
}
