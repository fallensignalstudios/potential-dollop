/**
 * Kit (ConvertKit) signup.
 *
 * TODO: Matthew has not created the Kit account yet.
 * Paste ONE value here: the numeric form id, or the full form action URL
 * from Kit's HTML embed (action="https://app.kit.com/forms/123/subscriptions").
 *
 * Leave this empty until then. The signup form stays visible and disabled.
 *
 * After pasting it, in the Kit form settings:
 * - Turn on the confirmation email (double opt-in).
 * - Set "Redirect to another page" to https://sovereigncall.com/thanks
 *   so a signup lands on /thanks. That redirect is stored in Kit, not in this repo.
 * - Tag the form `website` (source). The form also posts fields[source]=website.
 */
export const kitFormAction = "";

const KIT_HOST = "https://app.kit.com";

/** Resolve the single config value to a POST action, or null when unset. */
export function resolveKitAction(value: string = kitFormAction): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https:\/\/app\.(kit|convertkit)\.com\/forms\/\d+\/subscriptions\/?$/i.test(trimmed)) {
    return trimmed.replace(/\/$/, "");
  }
  if (/^\d+$/.test(trimmed)) {
    return `${KIT_HOST}/forms/${trimmed}/subscriptions`;
  }
  return null;
}
