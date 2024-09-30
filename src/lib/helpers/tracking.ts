export function trackEvent(
  eventName: string,
  properties: Record<string, any> = {}
): void {
  if (window.smartlook) {
    window.smartlook("track", eventName, properties);
  }
}
