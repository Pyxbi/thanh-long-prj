AGENTS.md — Long Gia / Hưng Thịnh Phát Website
1. Purpose
This repository is a frontend-first prototype for the Long Gia / Hợp tác xã Nông nghiệp Sạch Hưng Thịnh Phát website.
The primary goal is to keep every page visually consistent while moving quickly with Codex/v0-generated code.
When implementing or modifying UI:
1. Reuse the existing design system and components first.
2. Preserve the current layout language and brand identity.
3. Prioritize text, hierarchy, spacing, and component reuse before final imagery.
4. Real images are not finalized yet. Use replaceable placeholders and leave clear image slots.
5. Do not redesign existing pages unless explicitly requested.
The site should feel like one coherent product, not multiple templates pasted together.
2. Product / Brand Direction
The visual identity is:
- Premium Vietnamese agriculture
- Modern and clean
- Fresh and trustworthy
- Export-ready
- Editorial rather than overly corporate
- Warm, human, and connected to farmers / cultivation
- Suitable for B2B, wholesale, export partners, and consumer-facing storytelling
Avoid making the site look like:
- a generic SaaS landing page
- a generic ecommerce store
- an old-fashioned agricultural website
- a heavy enterprise dashboard
- a factory/industrial catalog
- a collection of unrelated templates
Use modern editorial layouts, large photography, whitespace, subtle organic forms, restrained animation, and strong typography.
3. Global Brand Colors
Use the existing project theme/tokens whenever they already exist.
Do not scatter raw hex values through components. Prefer CSS variables / Tailwind theme tokens.
Primary
Token	Name	Hex	Main use
dragon-berry	Dragon Berry	#BA466D	Primary brand accent, CTA, active states
forest-green	Forest Green	#6E8644	Agriculture, trust, dark sections, secondary CTA


Secondary
Token	Name	Hex	Main use
deep-rose	Deep Rose	#822944	Strong contrast, deep brand accent
harvest-gold	Harvest Gold	#E8CDA8	Warm accent, premium agricultural detail
spring-green	Spring Green	#B0BC78	Soft natural highlight
soft-ivory	Soft Ivory	#F0E8DD	Main warm page background / alternate sections


Additional interaction pink
#DC4E75 may be used only when a slightly brighter interaction color is needed, especially in the Long Gia Nhà Tôi experience.
It is an interaction variant, not a replacement for #BA466D.
Color balance
Preferred visual balance:
- White / Soft Ivory = most page backgrounds
- Dragon Berry = primary interaction and brand emphasis
- Forest Green = agricultural support and strong contrasting sections
- Deep Rose = deeper CTA / contrast
- Harvest Gold + Spring Green = occasional supporting accents only
Do not make every section pink or green.
Do not create a different color theme for every product.
4. Typography
Heading
Preferred font:
Newsreader
Use for:
- H1/H2/H3 editorial headings
- brand statements
- important messaging
- large section titles
Style intent:
- elegant
- premium
- slightly classic/editorial
- strong contrast against modern sans-serif body text
Body
Preferred brand font:
Neue Einstellung
If Neue Einstellung is not available in the repository, do not add a random font dependency just to imitate it.
Use the existing project sans-serif. If no project sans is defined, use a clean fallback such as Inter/system sans.
Use body font for:
- paragraphs
- labels
- forms
- navigation
- product specifications
- metadata
- buttons
General typography rules
- Keep Vietnamese diacritics correct.
- Do not uppercase long paragraphs.
- Editorial headings can use intentional line breaks on desktop.
- Remove forced heading line breaks on small screens when they cause awkward wrapping.
- Body content should remain highly readable.
- Avoid tiny text purely for visual effect.
5. Existing Component System — REUSE FIRST
Before creating a new component, inspect the repository for an existing equivalent.
Prefer extending existing components over creating duplicates.
Common reusable components should include equivalents of:
- Navbar
- Footer
- Container
- SectionHeading / SectionHeader
- Button
- Card
- Badge
- Input
- Textarea
- Select
- Tabs
- Dialog
- Sheet
- Accordion
- motion / reveal wrapper
- image wrapper
- CTA section
Names may differ in the actual repository. Reuse by behavior, not by exact name.
Do not do this
Do not create:
- NewButton
- ProductButton
- PinkButton
- ContactButton
if the existing Button component can support the design through variants.
Likewise, do not create separate page-specific containers, typography primitives, or cards when existing ones can be reused.
6. Component Variants
Prefer a small set of reusable variants.
Button
Expected semantic variants:
- primary
  - Dragon Berry background
  - light text
  - main CTA
- secondary
  - Forest Green or subtle outline depending on current implementation
- outline
  - transparent background
  - branded border
  - restrained hover
- ghost
  - navigation / tertiary action
Do not invent new button styling per page.
Card
Cards should generally use:
- soft border
- moderate radius
- restrained shadow
- clear spacing
- subtle hover lift only when interactive
Avoid exaggerated glassmorphism and heavy shadows.
Badge / pill
Use for:
- product category
- status
- current cultivation stage
- certification/status metadata
Keep badges compact.
7. Global Layout Rules
Respect the current repository's spacing and container tokens first.
If no established system exists, follow these principles:
- Large desktop content width with comfortable side gutters
- Generous vertical section spacing
- Clear alternation between white and Soft Ivory backgrounds
- Occasional Forest Green / Deep Rose full-width contrast sections
- Large visual image blocks paired with readable text
- Avoid dense multi-column layouts with too many small cards
Preferred page rhythm
A typical page can follow:
1. Navbar
2. Inner-page hero
3. Intro / overview
4. Main content sections
5. Trust / quality / process / storytelling section
6. CTA
7. Footer
Do not force this structure if the page brief requires a different flow.
8. Responsive Rules
All UI must be designed for desktop, tablet, and mobile.
Desktop
- editorial/asymmetric layouts are encouraged
- use 2-column image/text sections where appropriate
- product and feature grids can use 3–4 columns where readable
Tablet
- reduce complexity
- avoid overly narrow text columns
- convert complex grids to 2 columns
Mobile
- stack content vertically
- image typically appears before associated long text
- maintain generous spacing
- controls must be easy to tap
- buttons may become full-width when helpful
- dialogs/forms may become Sheet or full-screen panels
- do not preserve desktop line breaks if they hurt readability
9. Image Rules — IMPORTANT
Final photography is not finalized.
For current implementation work:
- use temporary relevant placeholder imagery
- leave intentional image slots
- make images easy to replace later
- prefer next/image / existing image abstraction
- use object-cover
- use stable aspect-ratio wrappers
- do not tightly couple layout to one placeholder image
Where practical, add a short comment:
{/* TODO: Replace with real Long Gia image */}
or a more specific version:
{/* TODO: Replace with real red dragon fruit product image */}
Preferred image subjects
Depending on the page:
- dragon fruit
- dragon fruit orchard
- farmers
- cultivation
- harvesting
- sorting
- washing line
- packing
- cold storage
- cartons / export
- coconut products
- product closeups
Do not waste implementation time searching for perfect stock photography.
Text + layout + hierarchy comes first.
10. Animation / Motion
Motion should be subtle and consistent with the current site.
Allowed patterns:
- fade-up on section entrance
- soft image reveal
- subtle card lift
- small image zoom (~1.02–1.04) on hover
- button background/border transitions
- selected-tab transition
- dialog/sheet transition
- lightweight progress transition
- restrained parallax only if already used in the project
Avoid:
- bouncing UI
- excessive parallax
- dramatic 3D motion
- constant moving decorations
- heavy animation libraries unless already part of the repo
- animation that delays access to content
11. Content Rules
The website copy is primarily Vietnamese.
When implementing content supplied by the user:
- preserve the supplied Vietnamese wording unless explicitly asked to rewrite it
- do not silently remove important facts
- do not invent certifications, numbers, factory capacities, markets, addresses, or product specifications
- keep supplied units and values consistent
- improve visual hierarchy through layout, not by deleting essential content
Long paragraphs may be visually broken into:
- short paragraphs
- bullet groups
- metadata rows
- cards
- highlights
without changing their meaning.
12. Global Navigation / Pages
Current site content includes these main experiences.
Exact routes should follow the repository's existing routing convention.
Home
Core homepage storytelling:
- brand overview
- featured products
- trust / capabilities
- cultivation/factory story
- press / media
- CTA
- shared footer
About / Về chúng tôi
Typical content:
- Thư ngỏ
- Tầm nhìn & Sứ mệnh
- Giá trị cốt lõi
- Lịch sử hình thành & phát triển
- partner CTA
Products / Sản phẩm
This is a B2B / wholesale / export showcase, not a retail ecommerce store.
Main products:
- Thanh Long Ruột Đỏ
- Thanh Long Ruột Trắng
- Thanh Long Vỏ Vàng
- Dừa Kim Cương
- Dừa Nắp Bật
Do not add:
- cart
- checkout
- retail price
- quantity selector
- customer account
Primary conversion action:
Yêu cầu báo giá
A quote request should reuse one common form/dialog.
Process / Quy trình
Main content:
1. Tiếp nhận nguyên liệu & phân loại sơ bộ
2. Vệ sinh bề mặt
3. Làm khô / xử lý kỹ thuật
4. Phân cấp trọng lượng & truy xuất
5. Đóng thùng & QC
6. Làm lạnh / kho lạnh
Present visually. Do not render as one long generic blog wall.
Contact / Liên hệ
Prefer:
- left: contact information + map
- right: contact / quotation form
Reuse form primitives.
Long Gia Nhà Tôi
This is a consumer-facing digital agriculture experience.
Concept:
- users can "nhận nuôi" a real dragon fruit pillar
- choose dragon fruit variety
- choose number of pillars
- choose adoption duration
- follow cultivation stages
- view pillar slots / status
- follow farm-to-table journey
Do not style it as a SaaS dashboard.
Keep it connected to the main Long Gia visual system.
13. Product Page Rules
Product presentation should feel premium and editorial.
Preferred structure:
- product hero
- category navigation
- product collection/cards
- supply/export specifications
- detailed product showcases
- B2B CTA
- quote request dialog
- shared footer
Product cards should emphasize:
- photography
- product name
- short descriptor
- origin/category metadata
- Xem chi tiết
- Yêu cầu báo giá
Avoid dense ecommerce UI.
14. Quote / Contact Forms
Reuse one shared form pattern whenever possible.
Common fields:
- Họ và tên
- Email
- Số điện thoại / Zalo
- Đơn vị / Địa chỉ
- Tiêu đề
- Nội dung
- CAPTCHA placeholder where requested
For product quote requests, include selected product context when available.
Prototype behavior is enough unless backend integration is explicitly requested.
Do not implement fake production payment/email behavior and present it as real.
15. Long Gia Nhà Tôi — Interaction Rules
Adoption form
Fields:
- Họ và tên
- Số điện thoại / Zalo
- loại thanh long
- số trụ
- thời gian nhận nuôi
Dragon fruit options:
- Thanh Long Ruột Đỏ HTP
- Thanh Long Ruột Trắng
- Thanh Long Vỏ Vàng
Pillar count options:
- 1
- 2
- 3
- 5
- 10
Duration:
- 3 tháng
- 6 tháng
- 12 tháng
Current prototype may show a mock confirmation for:
XÁC NHẬN & THANH TOÁN
Do not integrate real payment unless explicitly requested.
Cultivation stages
Use exactly four main stages:
1. Chong Đèn Kích Hoa
2. Tỉa Nhánh
3. Bọc Trái
4. Thu Hoạch
Interaction:
- stage cards are clickable
- selected stage displays detail below the card row
- do not open a separate modal
- do not route to another page
- avoid unnecessary icons and English helper labels
Pillar slots
Prototype with cards/grid unless a real map requirement is added later.
Use states such as:
- đang được nhận nuôi
- đang sinh trưởng
- sẵn sàng nhận nuôi
Available slots should reuse the adoption dialog.
16. Accessibility
Maintain baseline accessibility even for prototypes.
Requirements:
- semantic headings in logical order
- buttons must be real buttons
- navigation must use semantic links
- form controls require labels
- visible focus states
- dialogs/sheets must be keyboard accessible
- meaningful alt text for final images
- placeholder images may use generic but relevant alt text
- adequate text/background contrast
- do not encode status using color alone
17. Technical Implementation Rules
This project was initially generated / prototyped using v0-style frontend code.
Before coding:
1. Inspect existing stack and conventions.
2. Do not migrate frameworks without explicit instruction.
3. Preserve existing package choices.
4. Prefer current utility classes/tokens/components.
5. Keep page-specific content separate from shared primitives.
6. Avoid adding dependencies for tiny UI effects that CSS can handle.
If the project is Next.js + Tailwind + shadcn/ui, continue that stack.
Do not assume a rewrite is necessary.
18. Suggested Folder Responsibility
Follow the existing repository structure if already established.
If structure is unclear, prefer responsibilities similar to:
app/
  ...
components/
  layout/
  ui/
  sections/
  forms/
  product/
  long-gia-nha-toi/
lib/
data/
public/
Do not reorganize the whole repository merely to match this suggestion.
Shared components
Place globally reused UI in shared component folders.
Page-specific components
Only create page/domain-specific components when the UI has meaningful domain behavior, for example:
- ProductCard
- ProductShowcase
- QuoteRequestDialog
- ProcessStep
- QualityCard
- ContactInfoCard
- AdoptionForm
- CultivationStageCard
- CultivationStageDetail
- PillarCard
- AvailablePillarCard
- DeliveryJourney
19. Design Token Guidance
If the project already has CSS variables, extend them instead of creating parallel systems.
Example intent only:
:root {
  --dragon-berry: #ba466d;
  --forest-green: #6e8644;
  --deep-rose: #822944;
  --harvest-gold: #e8cda8;
  --spring-green: #b0bc78;
  --soft-ivory: #f0e8dd;
}
Prefer semantic tokens on top of raw brand tokens where supported, e.g.:
--background
--foreground
--primary
--primary-foreground
--secondary
--accent
--border
--muted
Do not refactor a working theme solely to match this example.
20. Decision Rules for Codex
When given a new page brief:
Step 1 — Inspect
Inspect:
- existing page layouts
- shared components
- theme tokens
- typography setup
- current Navbar/Footer
- responsive patterns
Step 2 — Reuse
List which existing components can be reused.
Step 3 — Add only what is missing
Create only domain-specific components that are actually needed.
Step 4 — Implement text/layout first
Use placeholder images when final images are unavailable.
Step 5 — Verify consistency
Before finishing, check:
- same Navbar
- same Footer
- same container widths
- same typography
- same brand colors
- same button language
- same spacing rhythm
- no duplicate primitives
- responsive mobile layout
- no accidentally invented business data
21. Non-Negotiable Rules
1. Do not redesign the global visual identity per page.
2. Do not duplicate shared components unnecessarily.
3. Do not hardcode unrelated colors when brand tokens exist.
4. Do not create a new Navbar or Footer for each page.
5. Do not convert the product page into ecommerce.
6. Do not convert Long Gia Nhà Tôi into a generic SaaS dashboard.
7. Do not invent business facts.
8. Do not block progress because real images are missing. Use replaceable placeholders.
9. Do not over-animate.
10. Do not rewrite supplied Vietnamese copy unless explicitly requested.
11. Keep implementation clean enough that real images/data/backend behavior can be added later.
12. Existing working code and repository conventions take precedence over examples in this file.
22. Definition of Done for a New Page
A page is ready for prototype review when:
- it uses the shared Navbar and Footer
- it follows the established brand palette
- typography matches the rest of the site
- the main content from the brief is present
- layout is polished on desktop
- tablet/mobile layouts are usable
- imagery has clear replaceable placeholders
- CTA behavior is represented
- shared components were reused where practical
- no obvious duplicate UI primitives were introduced
- there are no unnecessary ecommerce/dashboard patterns
- no unsupported business claims were invented
The next review pass will normally focus on replacing placeholder imagery and fine-tuning visual details.
