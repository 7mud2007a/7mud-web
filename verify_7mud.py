from playwright.sync_api import sync_playwright
import time

def run_verification(page):
    # Set viewport
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # 1. Take initial screenshot (Arabic, Dark Mode)
    page.screenshot(path="/home/jules/verification/screenshots/verification_ar_dark.png")
    page.wait_for_timeout(800)

    # 2. Toggle Language to English
    lang_btn = page.locator("button:has-text('English')").first
    if lang_btn.is_visible():
        lang_btn.click()
        page.wait_for_timeout(800)

    # 3. Toggle Theme to Light Mode
    theme_btn = page.locator("button[aria-label='Toggle Theme']").first
    if theme_btn.is_visible():
        theme_btn.click()
        page.wait_for_timeout(800)

    # Screenshot in English Light Mode
    page.screenshot(path="/home/jules/verification/screenshots/verification_en_light.png")
    page.wait_for_timeout(800)

    # 4. Scroll down to Estimator section and interact
    estimator = page.locator("#estimator")
    if estimator.is_visible():
        estimator.scroll_into_view_if_needed()
        page.wait_for_timeout(800)

    # 5. Scroll down to Projects and open a project modal
    projects = page.locator("#projects")
    if projects.is_visible():
        projects.scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        details_btn = page.locator("button:has-text('Details')").first
        if details_btn.is_visible():
            details_btn.click()
            page.wait_for_timeout(800)
            page.screenshot(path="/home/jules/verification/screenshots/verification.png")
            page.wait_for_timeout(800)
            # Close modal
            close_btn = page.locator("button[aria-label='Close']").first
            if close_btn.is_visible():
                close_btn.click()
                page.wait_for_timeout(800)

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
