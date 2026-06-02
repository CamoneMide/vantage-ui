export interface MockWaitlistOptions {
  shouldFail?: { message: string }
}

export async function runMockWaitlistSubmission(
  options?: MockWaitlistOptions,
): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
  });

  if (options?.shouldFail) {
    throw new Error(options.shouldFail.message);
  }
}
