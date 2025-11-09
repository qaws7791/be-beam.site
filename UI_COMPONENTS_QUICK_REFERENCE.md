# UI Components Quick Reference Guide

## BASE UI COMPONENTS (33 total)

### Form Components (7)
```
Button.tsx          - Action button (variants: default/outline, sizes: md/lg)
Input.tsx           - Text input with validation
Textarea.tsx        - Multi-line input with char count and max-length
Label.tsx           - Form label
Checkbox.tsx        - Toggle checkbox
RadioGroup.tsx      - Radio button group
FormMessage.tsx     - Error/validation messages
```

### Selection Components (8)
```
Select.tsx          - Dropdown select
Tabs.tsx            - Tab navigation
TabNav.tsx          - Navigation tab variant
Pagination.tsx      - Page navigation
ChoiceChip.tsx      - Selectable chips
Chip.tsx            - Static badge/tag
SquareChip.tsx      - Square chip variant
Tag.tsx             - Label tag
```

### Dialog Components (3)
```
Dialog.tsx          - Modal (with Header, Footer, Title, Description)
AlertDialog.tsx     - Alert/confirmation dialog
Popover.tsx         - Floating popover
```

### Data Display (8)
```
Calendar.tsx        - Date picker calendar
Rating.tsx          - Star rating
Table.tsx           - Data table
Text.tsx            - Typography wrapper
DropdownMenu.tsx    - Dropdown menu
Tooltip.tsx         - Hover tooltip
Accrodion.tsx       - Collapsible sections
Search.tsx          - Search input
```

### Utility Components (5)
```
GridGroup.tsx       - Responsive grid (1/2/3/4 cols)
LoadingSpinner.tsx  - Loading indicator
Logo.tsx            - Brand logo
IconButton.tsx      - Icon-only button
scroll-area.tsx     - Scrollable container
```

---

## COMMON COMPONENTS (26 total)

### Navigation (7)
```
Navbar.tsx               - Top nav bar with logo & user menu
NavMenu.tsx              - Navigation dropdown
NavbarUserSection.tsx    - User profile dropdown
SideBar.tsx              - Sidebar navigation
SideBarNavItem.tsx       - Sidebar menu item
SidebarSection.tsx       - Sidebar section
SidebarSubNavItem.tsx    - Nested sidebar item
```

### Form Inputs (8)
```
SearchInput.tsx      - Search field
DateInput.tsx        - Date field
DatePicker.tsx       - Date picker with calendar
DateRangePicker.tsx  - Date range selector
TimeInput.tsx        - Time selector
AddressInput.tsx     - Address with postcode lookup
ImageInput.tsx       - File upload with preview
RatingInput.tsx      - Star rating selector
```

### Content Display (5)
```
InfoItem.tsx         - Key-value display
TitleAndDes.tsx      - Title + description
Banner.tsx           - Top banner
Footer.tsx           - Footer
ImageViewerModal.tsx - Image gallery modal
```

### Advanced (6)
```
ConfirmDialog.tsx        - Confirmation dialog
Slider.tsx               - Range slider
TabsGroup.tsx            - Grouped tabs
DropdownMenuGroup.tsx    - Grouped dropdown
MoreDropdownMenu.tsx     - "More actions" menu
RatingFilter.tsx         - Rating filter
```

---

## ICON COMPONENTS (25 total)

### Navigation Icons
```
ArrowLeftIcon       ArrowRightIcon      ArrowDownIcon
ArrowUpIcon         CaretArrowDownIcon  ArrowDownFillIcon
ChevronRightIcon
```

### Action Icons
```
CheckIcon           CloseIcon           XIcon
EditIcon            TrashIcon           ImageIcon
CameraIcon          CalendarIcon        ClockIcon
SearchIcon          LocationIcon        InputDeleteIcon
```

### Status Icons
```
HeartIcon           HeartFillIcon       StarIcon
StarOutlineIcon     ThreeDotHorizontalIcon
SirenIcon
```

---

## PAGE ROUTES (28 total)

### Main Pages
```
/                           - Home (landing page)
/meetings                   - Browse meetings
/meeting/:meetingId         - Meeting detail
/reviews                    - Reviews list
/guideBooks                 - Guide books
/guideBook/:id              - Guide book detail
/host/:hostId               - Host profile
/search                     - Search results
```

### Auth
```
/login                      - Login page
/login/callback             - OAuth callback
```

### Meeting Management
```
/createMeeting              - Create meeting (multi-step)
/myPage/created             - User's created meetings
/myPage/participated        - Participated meetings
/myPage/requested           - Applied to meetings
/myPage/created/:id/intro   - Created meeting intro tab
/myPage/created/:id/detail  - Created meeting detail tab
/myPage/created/:id/manage  - Created meeting manage tab
```

### My Page
```
/myPage/                    - Dashboard
/myPage/likes               - Liked items
/myPage/likes/regular       - Liked meetings
/myPage/likes/small         - Liked small meetings
/myPage/likes/review        - Liked reviews
/myPage/reviews             - Review management
/myPage/reviews/written     - Written reviews
/myPage/reviews/reviewable  - Reviews to write
/myPage/profile             - Profile settings
/myPage/info                - User info
/myPage/notifications       - Notifications
/myPage/following           - Following list
```

---

## FEATURE COMPONENTS (26 total)

### Auth (1)
```
KakaoLoginButton.tsx        - Kakao OAuth login
```

### Meetings (4)
```
MeetingCard.tsx             - Meeting display card
MeetingTypeTag.tsx          - Meeting type badge
ApplyMeetingModal.tsx       - Apply for meeting form
MeetingCancelModal.tsx      - Cancel meeting confirm
```

### Reviews (8)
```
MeetingReviewContent.tsx    - Review display
MeetingReviewEditForm.tsx   - Review edit form
MeetingReviewEditModal.tsx  - Review edit modal
ReviewLikeCard.tsx          - Liked review card
ReviewLikeButton.tsx        - Like/unlike button
ReviewSort.tsx              - Sort control
MeetingReviewEditorProfile.tsx  - Author profile
ReviewUpdateForm.tsx        - Update review
ImageFilterChip.tsx         - Image filter
```

### Users (3)
```
UserProfileCard.tsx         - User profile summary
HostCard.tsx                - Host profile card
ProfileImageInput.tsx       - Profile picture upload
```

### Other Features
```
MypageMeetingMobileTab.tsx  - Mobile tabs (MyPage)
GuideBookCard.tsx           - Guide book card
GuideBookSelect.tsx         - Guide book selector
GuideBookRecommendationCard.tsx  - Recommended guide
GuideBooksFilterDialog.tsx  - Filter modal
DeclareModal.tsx            - Report/declare modal
ReportForm.tsx              - Report submission form
```

---

## RESPONSIVE BREAKPOINTS

**Tailwind Configuration:**
- `xs: 375px` - Mobile phones
- `sm: 476px` - Larger phones
- `md: 768px` - Tablets (Tailwind default)
- `lg: 1024px` - Desktops (Tailwind default)

**Example Patterns:**
```
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
md:text-sm
md:flex-row
md:h-12
sm:max-h-[calc(100vh-4rem)]
```

---

## INTERACTIVE FEATURES CHECKLIST

### Forms
- [ ] Multi-step meeting creation
- [ ] Profile/info update forms
- [ ] Review creation/editing
- [ ] Meeting application
- [ ] Report/declare forms
- [ ] Address lookup (Daum)

### Modals/Dialogs
- [ ] Apply meeting modal
- [ ] Cancel confirmation
- [ ] Review edit modal
- [ ] Image viewer modal
- [ ] Report modal
- [ ] Filter dialog

### Navigation
- [ ] Top navbar with search
- [ ] Mobile hamburger menu
- [ ] Sidebar (my page)
- [ ] Tab navigation
- [ ] Nested routing

### Search & Filters
- [ ] Global search
- [ ] Meeting filters
- [ ] Review filters
- [ ] Guide book filters
- [ ] Rating filters

### Actions
- [ ] Like/unlike
- [ ] Follow/unfollow
- [ ] Pagination
- [ ] Infinite scroll
- [ ] Image upload
- [ ] Date/time picking
- [ ] Address lookup

---

## KEY LIBRARIES

```
react                   - 19.1.0
react-router            - 7.8.0
tailwindcss             - 4.1.8
@radix-ui/*             - UI primitives
react-hook-form         - Form state
zod                     - Validation
zustand                 - State management
@tanstack/react-query   - Data fetching
swiper                  - Carousel
date-fns                - Date utils
react-hot-toast         - Notifications
lucide-react            - Icons
```

---

## DESIGN TOKENS

### Typography
```
text-t1, text-t2, text-t3, text-t4
text-b1
```

### Colors
```
Primary (action color)
gray-300, gray-400, gray-500, gray-600, gray-700
error (red)
white, black
```

### Effects
```
shadow-xs
focus rings
hover states
transitions
animations
```

---

## TESTING CHECKLIST

### Components
- [ ] Buttons render with correct variants
- [ ] Inputs validate and show errors
- [ ] Modals open/close
- [ ] Tabs switch content
- [ ] Dropdowns position correctly
- [ ] Calendar works
- [ ] Rating stars work

### Responsive
- [ ] xs (375px) adapts
- [ ] sm (476px) adapts
- [ ] md breakpoint adapts
- [ ] Mobile menu toggles
- [ ] Images scale
- [ ] Modals responsive

### Features
- [ ] OAuth login works
- [ ] Forms submit
- [ ] Search works
- [ ] Filters apply
- [ ] Like/unlike works
- [ ] Date/time work
- [ ] Address lookup works

### Accessibility
- [ ] Focus rings visible
- [ ] Keyboard navigation works
- [ ] Labels associated
- [ ] Color contrast OK
- [ ] ARIA labels present
- [ ] Error messages clear
