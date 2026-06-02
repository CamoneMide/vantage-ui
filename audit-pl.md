Here's the complete master priority list — all issues across all 60 flows, organized by severity and logical dependency.
Master Priority List
Phase 1: Critical Bugs (Fix Immediately)
#	Issue	Location	Flow
C1	inspectorActive flag never synced — keyboard shortcut & popup out of sync	authenticated-view.tsx, popup-store.ts	F9/F10
C2	Extraction success never saved to history store	mock-extraction.ts:45	F16
C3	Credits deducted optimistically before extraction completes — charged on failures	extraction-store.ts:86-87	F16
C4	"Purchase Credits" button in error state has no onClick handler (dead button)	extraction-error-state.tsx:81-102	F17
C5	Retry on failed extraction deducts another credit — no refund	extract-tab.tsx:59-61	F19
C6	History store not persisted — data lost on panel close	historySlice.ts:32	F27
C7	Mock data with real company names/external URLs used as production defaults in history	historySlice.ts:33, history.mock.ts	F27
C8	useCountUp initializes at targetValue not 0 — animation broken	use-count-up.ts:4	F41
C9	Layout thrash — getBoundingClientRect on every mousemove	ghost-highlight.tsx:17	F11
C10	Sign out doesn't deactivate active inspector overlay	popup-store.ts:115-121	F7
Phase 2: Design & UX Issues
#	Issue	Location	Flow
D1	Re-open history item doesn't open sandbox directly (extra click)	history-item.tsx:35-38	F29
D2	Onboarding Step 3 targets wrong element (content panel, not inspector toggle)	onboarding.config.ts:31	F47
D3	AuthState.loading hidden — no loading spinner in popup or side panel during auth	popup.tsx:57, sidepanel.tsx:101	F1/F3
D4	"Forgot password?" button has no onClick handler	login-form.tsx:82-87	F1
D5	Popover for delete confirmation — easy to accidentally dismiss	history-item.tsx:142-230	F30
D6	Progress bar "50 max capacity" label incorrect for >50 credits	credit-balance-card.tsx:126	F41
D7	Navigation buttons in success view show dead "← Back" button	extract-tab.tsx:154-172	F25
D8	Prompt cross-fade animation doesn't actually cross-fade	prompt-display.tsx:15-31	F24
D9	Sandbox always downloads as same filename	sandpack-toolbar.tsx:30	F22
Phase 3: Data Integrity & Validation
#	Issue	Location	Flow
V1	ELEMENT_SELECTED payload never validated against Zod schema	extract-tab.tsx:37-38	F12
V2	mockSignup bypasses initSignupCredits() — no welcome transaction recorded	popup-store.ts:100-113	F2
V3	mockCreditBalance / mockTransactionHistory used as persisted defaults in credits store	creditsSlice.ts:83-84	F41
V4	No sibling DOM navigation (left/right arrows)	inspector-overlay.tsx:107-117	F13
V5	data-state mislabeled as ARIA attribute constant	types.ts:11	F11
V6	startExtraction() crashes if selectedElement is null	extraction-store.ts:83-85	F16
V7	Shadow DOM elements silently pass selection	dom-utils.ts:39-46	F15
Phase 4: Code Quality & Consistency
#	Issue	Location	Flow
Q1	as any type cast on toast call	credit-pack-selector.tsx:62	F44
Q2	ui-slice uses localStorage inconsistently with other stores	ui-slice.ts:39-50	F58
Q3	StoreProvider is transparent fragment — serves no purpose	store-provider.tsx	All
Q4	Inconsistent styling (inline + Tailwind mixed) across auth components	Multiple files	F1-F8
Q5	Toast with emoji in signup — inconsistent with rest of app	signup-form.tsx:32	F2
Q6	TooltipProvider wrapped per ColorSwatchCard instead of root level	color-palette-grid.tsx	F34
Q7	No theme-color meta tag or JSON-LD on landing page	layout.tsx	F51
Q8	Dual styling system on landing page (Tailwind classes + inline styles)	navbar.tsx	F54
Phase 5: Test Coverage & Mock Improvements
#	Issue	Location	Flow
T1	No unknown error mock fixture for testing	extractions.mock.ts:72	F18
T2	No purchase failure simulation	credit-pack-selector.tsx:48	F44
T3	No waitlist submission failure simulation	waitlist-form.tsx:25	F52
T4	Prompt generator uses static mock prompts, ignores extraction data	prompt-generator-panel.tsx	F21