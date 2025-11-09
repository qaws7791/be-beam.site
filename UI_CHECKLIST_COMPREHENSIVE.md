# UI Components, Pages, and Features Checklist

## Project Overview
- **Framework**: React 19 with React Router 7
- **Styling**: Tailwind CSS 4.1.8
- **Component Library**: Radix UI
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Carousel**: Swiper
- **Date/Time**: date-fns, react-day-picker
- **Icons**: Lucide React + Custom SVG icons
- **Notifications**: React Hot Toast

---

## 1. PAGE COMPONENTS (in /app/routes/)

### Main Pages
- **Home**: `/home/index.tsx` - Landing page
- **Meetings**: `/meetings/index.tsx` - Browse all meetings
- **Meeting Detail**: `/meetingDetail/index.tsx` - Single meeting view
- **Reviews**: `/reviews/index.tsx` - All reviews listing
- **Guide Books**: `/guideBooks/index.tsx` - Guide books listing
- **Guide Book Detail**: `/guideBookDetail/index.tsx` - Single guide book view
- **Host Detail**: `/hostDetail/index.tsx` - Host profile page
- **Search**: `/search/index.tsx` - Universal search results

### Authentication
- **Login**: `/login/index.tsx` - Login page
- **Login Callback**: `/loginCallback/index.tsx` - OAuth callback handler

### Meeting Management
- **Create Meeting**: `/createMeeting/index.tsx` - Multi-step form to create meetings
- **Created Meetings**: `/createdMeeting/index.tsx` - List of user-created meetings
- **Participated Meetings**: `/participatedMeeting/index.tsx` - Meetings user joined
- **Requested Meetings**: `/requestedMeeting/index.tsx` - Meetings user applied to
- **Created Meeting Detail Intro**: `/createdMeetingDetailIntro/index.tsx` - Intro tab
- **Created Meeting Detail Detail**: `/createdMeetingDetailDetail/index.tsx` - Details tab
- **Created Meeting Detail Manage**: `/createdMeetingDetailManage/index.tsx` - Management tab

### My Page (User Dashboard)
- **My Page Root**: `/myPage/` - Dashboard layout
- **My Likes**: `/myLikes/index.tsx` - Main likes page
  - **Regular Meeting Likes**: `/regularMeetingLikes/index.tsx` - Liked meetings
  - **Small Meeting Likes**: `/smallMeetingLikes/index.tsx` - Liked small meetings
  - **Review Likes**: `/reviewLikes/index.tsx` - Liked reviews
- **My Reviews**: `/myReviews/index.tsx` - Review management
  - **Written Reviews**: `/writtenReviews/index.tsx` - User's written reviews
  - **Reviewable Reviews**: `/reviewableReviews/index.tsx` - Pending reviews to write
- **My Profile**: `/myProfile/index.tsx` - Profile management
- **My Information**: `/myInformation/index.tsx` - User info settings
- **My Notifications**: `/myNotifications/index.tsx` - Notification center
- **My Following**: `/myFollowing/index.tsx` - Following list

---

## 2. REUSABLE UI COMPONENTS

### Base/Primitive Components (/app/shared/components/ui/)

**Form & Input Components**
- **Button.tsx** - Versatile button with variants (default, outline) and sizes (md, lg)
- **Input.tsx** - Text input field with validation states
- **Textarea.tsx** - Multi-line text input with label, max-length, error handling
- **Label.tsx** - Form label component
- **Checkbox.tsx** - Toggle checkbox
- **RadioGroup.tsx** - Radio button group
- **FormMessage.tsx** - Form error/validation messages

**Selection Components**
- **Select.tsx** - Dropdown select with custom styling
- **Tabs.tsx** - Tab navigation with TabsList, TabsTrigger, TabsContent
- **TabNav.tsx** - Navigation tabs variant
- **Pagination.tsx** - Page navigation
- **ChoiceChip.tsx** - Selectable chip buttons
- **Chip.tsx** - Static chip/badge component
- **SquareChip.tsx** - Square-shaped chip variant
- **Tag.tsx** - Tag/label component

**Dialog & Overlay**
- **Dialog.tsx** - Modal dialog (DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription)
- **AlertDialog.tsx** - Alert/confirmation dialog
- **Popover.tsx** - Floating popover component

**Data Display**
- **Calendar.tsx** - Date picker calendar (with month navigation)
- **Rating.tsx** - Star rating display and interaction
- **Table.tsx** - Data table component
- **Text.tsx** - Typography wrapper
- **DropdownMenu.tsx** - Dropdown menu with sections and shortcuts
- **Tooltip.tsx** - Hover tooltips
- **Accrodion.tsx** - Accordion/collapsible sections

**Utilities**
- **GridGroup.tsx** - Responsive grid layout (responsive breakpoints: xs, sm, md, lg)
- **LoadingSpinner.tsx** - Loading indicator
- **Logo.tsx** - Brand logo component
- **Search.tsx** - Search input component
- **IconButton.tsx** - Button with icon only
- **scroll-area.tsx** - Scrollable container with scrollbar styling

### Common/Composite Components (/app/shared/components/common/)

**Navigation Components**
- **Navbar.tsx** - Main top navigation bar with user menu
- **NavMenu.tsx** - Navigation menu dropdown
- **NavbarUserSection.tsx** - User profile dropdown in navbar
- **SideBar.tsx** - Sidebar navigation
- **SideBarNavItem.tsx** - Sidebar menu item
- **SidebarSection.tsx** - Sidebar section grouping
- **SidebarSubNavItem.tsx** - Nested sidebar menu item

**Input Components**
- **SearchInput.tsx** - Search field with icon
- **DateInput.tsx** - Date field wrapper
- **DatePicker.tsx** - Date picker with calendar popup
- **DateRangePicker.tsx** - Range date selection
- **TimeInput.tsx** - Time selection input
- **AddressInput.tsx** - Address with postcode lookup (Daum)
- **ImageInput.tsx** - File upload with preview
- **RatingInput.tsx** - Rating selector (star inputs)

**Information Display**
- **InfoItem.tsx** - Key-value info display
- **TitleAndDes.tsx** - Title and description layout
- **Banner.tsx** - Top banner component
- **Footer.tsx** - Footer component

**Modal & Dialog Wrappers**
- **ImageViewerModal.tsx** - Image gallery modal with Swiper
- **ConfirmDialog.tsx** - Confirmation dialog wrapper

**Advanced Components**
- **Slider.tsx** - Range slider component
- **TabsGroup.tsx** - Grouped tabs
- **DropdownMenuGroup.tsx** - Grouped dropdown menus
- **MoreDropdownMenu.tsx** - "More actions" menu
- **RatingFilter.tsx** - Rating filter control

### Icon Components (/app/shared/components/icons/)
Total: 25 icon components

**Navigation Icons**
- ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon, ArrowUpIcon
- CaretArrowDownIcon, ArrowDownFillIcon
- ChevronRightIcon

**Action Icons**
- CheckIcon, CloseIcon, XIcon
- EditIcon, TrashIcon, ImageIcon, CameraIcon
- CalendarIcon, ClockIcon, SearchIcon, LocationIcon
- InputDeleteIcon

**Status Icons**
- HeartIcon, HeartFillIcon
- StarIcon, StarOutlineIcon
- ThreeDotHorizontalIcon
- SirenIcon

### Layout Templates (/app/shared/components/layout/)
- **CommonTemplate.tsx** - Common page layout wrapper
- **MyPageTemplate.tsx** - My page layout
- **myPage.tsx** - My page layout provider
- **myLikes.tsx** - Likes section layout
- **myReview.tsx** - Review section layout
- **createdMeetingDetail.tsx** - Created meeting detail layout

---

## 3. FEATURE-SPECIFIC COMPONENTS

### Authentication Features (/app/features/auth/)
- **KakaoLoginButton.tsx** - Kakao OAuth login button

### Meetings Features (/app/features/meetings/)
- **MeetingCard.tsx** - Meeting display card
- **MeetingTypeTag.tsx** - Meeting type indicator
- **ApplyMeetingModal.tsx** - Form to apply for meeting
- **MeetingCancelModal.tsx** - Confirm meeting cancellation

### Reviews Features (/app/features/reviews/)
- **MeetingReviewContent.tsx** - Review content display
- **MeetingReviewEditForm.tsx** - Review edit form
- **MeetingReviewEditModal.tsx** - Review edit modal
- **ReviewLikeCard.tsx** - Liked review card
- **ReviewLikeButton.tsx** - Like/unlike review button
- **ReviewSort.tsx** - Review sorting control
- **MeetingReviewEditorProfile.tsx** - Review author profile
- **ReviewUpdateForm.tsx** - Update review form
- **ImageFilterChip.tsx** - Filter reviews by images

### Users Features (/app/features/users/)
- **UserProfileCard.tsx** - User profile summary card
- **HostCard.tsx** - Host profile card
- **ProfileImageInput.tsx** - Profile picture upload

### My Page Features (/app/features/mypage/)
- **MypageMeetingMobileTab.tsx** - Mobile tabs for meeting sections

### Guide Books Features (/app/features/guidebooks/)
- **GuideBookCard.tsx** - Guide book card display
- **GuideBookSelect.tsx** - Guide book selection
- **GuideBookRecommendationCard.tsx** - Recommended guide book
- **GuideBooksFilterTabGroup.tsx** - Filter tabs
- **GuideBooksFilterDialog.tsx** - Advanced filters modal

### Report/Declare Features (/app/features/report/)
- **DeclareModal.tsx** - Report/declare issue modal
- **ReportForm.tsx** - Report submission form

### Search Features (/app/features/search/)
- Hooks for searching meetings, guidebooks, hosts, and total search

### Notifications Features (/app/features/notifications/)
- Hooks for notification queries and filtering

---

## 4. INTERACTIVE FEATURES

### Forms
- Multi-step meeting creation form with validation
- User profile/information update forms
- Review creation and editing forms
- Meeting application forms
- Report/declare forms
- Address input with postcode lookup

### Modals & Dialogs
- Apply meeting modal with textarea and preview
- Meeting cancellation confirmation
- Review edit/update modals
- Image viewer modal with carousel
- Report/declare modal
- Guide book filter dialog
- Confirmation dialogs

### Navigation & Routing
- Top navigation bar with logo, search, and user menu
- Mobile-responsive menu (hamburger navigation)
- Sidebar navigation for my page
- Tab-based navigation (reviews, likes sections)
- Breadcrumb/nested routing for created meeting details

### Search & Filtering
- Global search functionality (meetings, reviews, guidebooks, hosts)
- Meeting filter controls (date, location, type, price, participants)
- Review filters (sort, image filters)
- Guide book filters (category, type)
- Rating filters
- Responsive filter UI

### Like/Favorite System
- Like/unlike buttons with state management
- Liked items management (meetings, reviews)
- Separate like lists for different content types

### Data Management
- Pagination for large lists
- Infinite scroll capability
- Table components for structured data
- Grid layouts for card displays

### User Actions
- OAuth login (Kakao)
- Profile management
- Following/unfollowing users
- Review writing and editing
- Meeting creation and management
- Attendance tracking

---

## 5. RESPONSIVE DESIGN UTILITIES & BREAKPOINTS

### Tailwind Configuration (tailwind.config.ts)
**Custom Breakpoints:**
- `xs: 375px` - Extra small devices (mobile phones)
- `sm: 476px` - Small devices (larger phones)
- Standard Tailwind breakpoints (default): sm, md, lg, xl, 2xl

**Dark Mode Support:**
- Implementation: CSS class-based dark mode (`dark` class on html/body)

### Responsive Patterns Used in Codebase
- **Mobile-first approach**: Default styles for mobile, enhanced with sm:, md:, lg: prefixes
- **Grid layouts**: GridGroup component with responsive columns
  - Grid example: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- **Flexbox utilities**: Responsive flex direction, gaps, and sizing
- **Hidden/Visible utilities**: Components hidden on mobile, shown on desktop (and vice versa)
- **Font size scaling**: Text sizes adjust based on breakpoints
- **Spacing adjustments**: Padding/margins adjust for different screen sizes

### Example Responsive Classes Found:
- `md:text-sm` - Medium screens get smaller text
- `md:flex-row` - Medium screens switch to row direction
- `md:h-12` - Medium screens get different heights
- `md:w-12` - Medium screens get different widths
- `sm:max-h-[calc(100vh-4rem)]` - Small screens adjust max height

### Mobile-Responsive Features:
- Mobile menu with hamburger navigation
- Responsive grid layouts that adapt to screen size
- Touch-friendly interactive elements
- Mobile tabs for section navigation
- Stacked layouts on mobile, side-by-side on desktop
- Responsive modals (full width on mobile, centered on desktop)

---

## 6. DESIGN SYSTEM & STYLING

### Typography Classes
- `text-t1` through `text-t4` - Text sizes
- `text-b1` - Body text
- Color utilities: primary, gray-*, error, etc.

### Color Palette
- **Primary**: Primary action color
- **Grays**: gray-300, gray-400, gray-500, gray-600, gray-700 (various shades)
- **Status**: error (red), success (implied)
- **Black/White**: Text and backgrounds

### Spacing System
- Uses Tailwind's default spacing (px, 2, 3, 4, 6, 8, 10, 12, etc.)
- Gap utilities for spacing between items
- Padding and margin utilities with responsive prefixes

### Shadows & Effects
- `shadow-xs` - Small shadow
- Focus rings for accessibility
- Hover states with color transitions
- Disabled states with opacity reduction

### Animation & Transitions
- Fade in/out animations
- Zoom animations for modals
- Smooth transitions on color and box-shadow
- CSS animations library (tw-animate-css)

### Accessibility Features
- Focus visible rings on interactive elements
- ARIA labels and descriptions
- Screen reader only text (sr-only)
- Proper semantic HTML
- Form validation and error messages
- Keyboard navigation support

---

## 7. COMPONENT INVENTORY SUMMARY

| Category | Count | Location |
|----------|-------|----------|
| Base UI Components | 33 | `/shared/components/ui/` |
| Common Components | 26 | `/shared/components/common/` |
| Icon Components | 25 | `/shared/components/icons/` |
| Feature Components | 26 | `/features/*/components/` |
| Page Routes | 28 | `/routes/*/` |
| Layout Components | 6 | `/shared/components/layout/` |
| **Total Components** | **~145** | Various |

---

## 8. EXTERNAL LIBRARIES & DEPENDENCIES

### UI Framework
- @radix-ui/* - Unstyled, accessible components
- lucide-react - Icon library

### Form Management
- react-hook-form - Form state management
- @hookform/resolvers - Form validation resolvers
- zod - Schema validation

### Data Fetching & State
- @tanstack/react-query - Data fetching and caching
- zustand - Lightweight state management

### Utilities
- class-variance-authority (CVA) - Component styling variants
- clsx & tailwind-merge - Class name utilities
- date-fns - Date manipulation
- lodash - Utility functions
- js-cookie - Cookie management
- react-intersection-observer - Scroll detection
- react-window - Virtual scrolling (if used)

### Additional Features
- Swiper - Image carousel/slider
- react-daum-postcode - Korean address lookup
- react-day-picker - Calendar component
- react-hot-toast - Toast notifications
- react-router - Routing

---

## CHECKLIST TEMPLATE FOR QA/TESTING

Use this template to verify all components are working correctly:

### UI Components Testing
- [ ] All buttons display correctly with variants (default, outline)
- [ ] Input fields accept text and show validation errors
- [ ] Textarea supports max-length and character count
- [ ] Select dropdowns open and close properly
- [ ] Checkboxes and radio buttons toggle correctly
- [ ] Modals/Dialogs can be opened and closed
- [ ] Tabs switch content properly
- [ ] Pagination navigates through pages
- [ ] Calendar date picker works on mobile and desktop
- [ ] Rating stars clickable and update
- [ ] Dropdowns open at correct position

### Responsive Design Testing
- [ ] Layouts adapt at xs (375px) breakpoint
- [ ] Layouts adapt at sm (476px) breakpoint
- [ ] Layouts adapt at md breakpoint
- [ ] Navigation toggles to mobile menu on small screens
- [ ] Images scale properly across devices
- [ ] Modals are full-width on mobile, centered on desktop
- [ ] Font sizes adjust appropriately
- [ ] Spacing maintains consistency across breakpoints

### Feature Testing
- [ ] Login with Kakao OAuth works
- [ ] Meeting creation form multi-step flow works
- [ ] Meeting application modal opens and submits
- [ ] Search functionality finds meetings, reviews, guides, hosts
- [ ] Filters apply and clear correctly
- [ ] Like/unlike buttons toggle and persist
- [ ] Review edit modals load and save changes
- [ ] Image upload and preview works
- [ ] Date/time pickers function correctly
- [ ] Address lookup works (Daum postcode)
- [ ] Notifications display and clear

### Accessibility Testing
- [ ] Focus rings visible on all interactive elements
- [ ] Keyboard navigation works throughout
- [ ] Form labels associated with inputs
- [ ] Error messages descriptive and accessible
- [ ] Color contrast meets standards
- [ ] ARIA labels present on custom components
- [ ] Screen reader announces important updates

