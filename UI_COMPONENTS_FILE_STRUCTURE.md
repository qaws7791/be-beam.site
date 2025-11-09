# UI Components - Directory Structure & File Paths

## Complete File Structure Map

```
/app/
├── shared/
│   ├── components/
│   │   ├── ui/                          (33 base components)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Label.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── FormMessage.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── TabNav.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── ChoiceChip.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── SquareChip.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── AlertDialog.tsx
│   │   │   ├── Popover.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Rating.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Accrodion.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── GridGroup.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── TextField.tsx
│   │   │
│   │   ├── common/                      (26 common/composite components)
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavMenu.tsx
│   │   │   ├── NavbarUserSection.tsx
│   │   │   ├── SideBar.tsx
│   │   │   ├── SideBarNavItem.tsx
│   │   │   ├── SidebarSection.tsx
│   │   │   ├── SidebarSubNavItem.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── DateInput.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   ├── TimeInput.tsx
│   │   │   ├── AddressInput.tsx
│   │   │   ├── ImageInput.tsx
│   │   │   ├── RatingInput.tsx
│   │   │   ├── InfoItem.tsx
│   │   │   ├── TitleAndDes.tsx
│   │   │   ├── Banner.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ImageViewerModal.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── TabsGroup.tsx
│   │   │   ├── DropdownMenuGroup.tsx
│   │   │   ├── MoreDropdownMenu.tsx
│   │   │   └── RatingFilter.tsx
│   │   │
│   │   ├── icons/                       (25 icon components)
│   │   │   ├── ArrowLeftIcon.tsx
│   │   │   ├── ArrowRightIcon.tsx
│   │   │   ├── ArrowDownIcon.tsx
│   │   │   ├── ArrowUpIcon.tsx
│   │   │   ├── CaretArrowDownIcon.tsx
│   │   │   ├── ArrowDownFillIcon.tsx
│   │   │   ├── ChevronRightIcon.tsx
│   │   │   ├── CheckIcon.tsx
│   │   │   ├── CloseIcon.tsx
│   │   │   ├── XIcon.tsx
│   │   │   ├── EditIcon.tsx
│   │   │   ├── TrashIcon.tsx
│   │   │   ├── ImageIcon.tsx
│   │   │   ├── CameraIcon.tsx
│   │   │   ├── CalendarIcon.tsx
│   │   │   ├── ClockIcon.tsx
│   │   │   ├── SearchIcon.tsx
│   │   │   ├── LocationIcon.tsx
│   │   │   ├── InputDeleteIcon.tsx
│   │   │   ├── HeartIcon.tsx
│   │   │   ├── HeartFillIcon.tsx
│   │   │   ├── StarIcon.tsx
│   │   │   ├── StarOutlineIcon.tsx
│   │   │   ├── ThreeDotHorizontalIcon.tsx
│   │   │   └── SirenIcon.tsx
│   │   │
│   │   └── layout/                      (6 layout templates)
│   │       ├── CommonTemplate.tsx
│   │       ├── MyPageTemplate.tsx
│   │       ├── myPage.tsx
│   │       ├── myLikes.tsx
│   │       ├── myReview.tsx
│   │       └── createdMeetingDetail.tsx
│   │
│   ├── hooks/                           (Custom hooks)
│   │   ├── userUrlFilters.ts
│   │   ├── useInfiniteScroll.tsx
│   │   └── usePagination.ts
│   │
│   ├── stores/                          (Zustand stores)
│   │   ├── useCreateMeetingFormStore.ts
│   │   ├── useAuthStore.ts
│   │   └── useModalStore.ts
│   │
│   └── utils/                           (Utilities)
│       ├── date.ts
│       ├── file.ts
│       ├── theme.ts
│       ├── cookie.ts
│       ├── cash.ts
│       └── filter.ts
│
├── features/                            (Feature-specific components)
│   ├── auth/
│   │   └── components/
│   │       └── KakaoLoginButton.tsx
│   │
│   ├── meetings/
│   │   └── components/
│   │       ├── MeetingCard.tsx
│   │       ├── MeetingTypeTag.tsx
│   │       ├── ApplyMeetingModal.tsx
│   │       └── MeetingCancelModal.tsx
│   │
│   ├── reviews/
│   │   └── components/
│   │       ├── MeetingReviewContent.tsx
│   │       ├── MeetingReviewEditForm.tsx
│   │       ├── MeetingReviewEditModal.tsx
│   │       ├── ReviewLikeCard.tsx
│   │       ├── ReviewLikeButton.tsx
│   │       ├── ReviewSort.tsx
│   │       ├── MeetingReviewEditorProfile.tsx
│   │       ├── ReviewUpdateForm.tsx
│   │       └── ImageFilterChip.tsx
│   │
│   ├── users/
│   │   └── components/
│   │       ├── UserProfileCard.tsx
│   │       ├── HostCard.tsx
│   │       └── ProfileImageInput.tsx
│   │
│   ├── mypage/
│   │   └── components/
│   │       └── MypageMeetingMobileTab.tsx
│   │
│   ├── guidebooks/
│   │   ├── hooks/
│   │   │   └── useGuideBookFilterDialog.tsx
│   │   └── components/
│   │       ├── GuideBookCard.tsx
│   │       ├── GuideBookSelect.tsx
│   │       ├── GuideBookRecommendationCard.tsx
│   │       ├── GuideBooksFilterTabGroup.tsx
│   │       └── GuideBooksFilterDialog.tsx
│   │
│   ├── report/
│   │   └── components/
│   │       ├── DeclareModal.tsx
│   │       └── ReportForm.tsx
│   │
│   ├── search/
│   │   └── hooks/
│   │       ├── useSearchMeetingsQuery.ts
│   │       ├── useSearchTotalQuery.ts
│   │       ├── useSearchGuidebooksQuery.ts
│   │       └── useSearchHostsQuery.ts
│   │
│   └── notifications/
│       └── hooks/
│           ├── useMyNotificationsFilter.ts
│           └── useMyNotificationsQuery.ts
│
└── routes/                              (Page components - 28 routes)
    ├── home/
    │   ├── index.tsx
    │   └── _components/
    │       ├── MainVisualSlider.tsx
    │       ├── AboutSection.tsx
    │       ├── HomeTemplate.tsx
    │       ├── ValueSection.tsx
    │       ├── ValueCard.tsx
    │       ├── MeetingRecommendations.tsx
    │       └── MeetingRecommendationSection.tsx
    │
    ├── login/
    │   ├── index.tsx
    │   └── _components/
    │       ├── LoginTemplate.tsx
    │       └── LoginCard.tsx
    │
    ├── loginCallback/
    │   └── index.tsx
    │
    ├── meetings/
    │   ├── index.tsx
    │   └── _components/
    │       ├── MeetingFilterControls.tsx
    │       ├── MeetingCardGroup.tsx
    │       └── MeetingWrap.tsx
    │
    ├── meetingDetail/
    │   ├── index.tsx
    │   └── _components/
    │       ├── MeetingDetailCard.tsx
    │       ├── MeetingDetailCardTop.tsx
    │       ├── MeetingDetailContent.tsx
    │       ├── MeetingDetailContentMiddle.tsx
    │       ├── MeetingDetailContentTab.tsx
    │       ├── MeetingDetailHost.tsx
    │       ├── MeetingDetailContentWrap.tsx
    │       ├── MeetingDetailContentSmallTitleAndDes.tsx
    │       ├── MeetingDetailWrap.tsx
    │       ├── MeetingDetailReviews.tsx
    │       ├── MeetingDetailScheduleContent.tsx
    │       └── RecruitmentTypeAndTopic.tsx
    │
    ├── createMeeting/
    │   ├── index.tsx
    │   └── _components/
    │       ├── CreateMeetingTemplate.tsx
    │       ├── CreateMeetingFirstContent.tsx
    │       ├── CreateMeetingSecondContent.tsx
    │       ├── CreateMeetingThirdContent.tsx
    │       └── CreateMeetingFourthContent.tsx
    │
    ├── createdMeeting/
    │   ├── index.tsx
    │   └── _components/
    │       └── CreatedMeetingWrap.tsx
    │
    ├── createdMeetingDetailIntro/
    │   ├── index.tsx
    │   └── _components/
    │       └── CreatedMeetingDetailIntroWrap.tsx
    │
    ├── createdMeetingDetailDetail/
    │   ├── index.tsx
    │   └── _components/
    │       ├── CreatedMeetingDetailContent.tsx
    │       └── CreatedMeetingScheduleContent.tsx
    │
    ├── createdMeetingDetailManage/
    │   ├── index.tsx
    │   └── _components/
    │       ├── CreatedMeetingParticipantsManageContent.tsx
    │       ├── CreatedMeetingAttendanceManageContent.tsx
    │       └── CreatedMeetingApplicantsManageContent.tsx
    │
    ├── participatedMeeting/
    │   ├── index.tsx
    │   └── _components/
    │       └── ParticipatedMeetingWrap.tsx
    │
    ├── requestedMeeting/
    │   ├── index.tsx
    │   └── _components/
    │       └── RequestedMeetingWrap.tsx
    │
    ├── reviews/
    │   ├── index.tsx
    │   └── _components/
    │       └── ReviewFilters.tsx
    │
    ├── guideBooks/
    │   ├── index.tsx
    │   └── _components/
    │       ├── GuideBooksContent.tsx
    │       └── TargetTypeTab.tsx
    │
    ├── guideBookDetail/
    │   ├── index.tsx
    │   └── _components/
    │       ├── GuideBookDetailContent.tsx
    │       ├── GuideBookDetailWrap.tsx
    │       └── GuideBookRecommendation.tsx
    │
    ├── hostDetail/
    │   ├── index.tsx
    │   └── _components/
    │       └── HostDetailWrap.tsx
    │
    ├── search/
    │   ├── index.tsx
    │   ├── _hooks/
    │   │   └── useSearchPage.ts
    │   └── _components/
    │       ├── AllSearchResults.tsx
    │       ├── HostsSearchResults.tsx
    │       ├── GuidebookSearchResults.tsx
    │       └── MeetingSearchResults.tsx
    │
    ├── myPage/ (Dashboard layout)
    │   ├── index.tsx
    │   │
    │   ├── myLikes/
    │   │   ├── index.tsx
    │   │   └── _components/
    │   │       └── ...
    │   │
    │   ├── regularMeetingLikes/
    │   │   ├── index.tsx
    │   │   └── _components/
    │   │       ├── RegularMeetingLikesGrid.tsx
    │   │       ├── RegularMeetingLikesPagination.tsx
    │   │       └── RegularMeetingLikesContent.tsx
    │   │
    │   ├── smallMeetingLikes/
    │   │   └── index.tsx
    │   │
    │   ├── reviewLikes/
    │   │   └── index.tsx
    │   │
    │   ├── myReviews/
    │   │   └── index.tsx
    │   │
    │   ├── writtenReviews/
    │   │   └── index.tsx
    │   │
    │   ├── reviewableReviews/
    │   │   ├── index.tsx
    │   │   └── _components/
    │   │       └── ReviewForm.tsx
    │   │
    │   ├── myProfile/
    │   │   ├── index.tsx
    │   │   └── _components/
    │   │       └── ProfileForm.tsx
    │   │
    │   ├── myInformation/
    │   │   ├── index.tsx
    │   │   └── _components/
    │   │       └── UserInformationForm.tsx
    │   │
    │   ├── myNotifications/
    │   │   └── index.tsx
    │   │
    │   ├── myFollowing/
    │   │   └── index.tsx
    │   │
    │   └── likes/
    │       └── (nested likes routes)
    │
    └── root.tsx (App root component)
```

## Component Import Patterns

### Absolute Imports (configured in tsconfig.json)
```typescript
// UI Components
import { Button } from '@/shared/components/ui/Button';
import { Dialog, DialogContent } from '@/shared/components/ui/Dialog';
import { Input } from '@/shared/components/ui/Input';

// Common Components
import Navbar from '@/shared/components/common/Navbar';
import { DatePicker } from '@/shared/components/common/DatePicker';

// Icons
import SearchIcon from '@/shared/components/icons/SearchIcon';

// Features
import { MeetingCard } from '@/features/meetings/components/MeetingCard';
import { UserProfileCard } from '@/features/users/components/UserProfileCard';

// Utilities
import { cn } from '@/styles/tailwind';
```

## Absolute Path Aliases (tsconfig.json)
```
@/ → /app/
```

## Component Variants & Props

### Button Component
```typescript
// Variants
variant: 'default' | 'outline'
size: 'md' | 'lg'

// Example usage
<Button variant="default" size="md">Click me</Button>
<Button variant="outline">Outline</Button>
```

### Dialog Component
```typescript
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent showCloseButton={true}>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      {/* Footer content */}
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Input Component
```typescript
// Standard input
<Input type="text" placeholder="Enter text" />

// With validation
<Input 
  type="email" 
  aria-invalid={hasError}
  placeholder="Email"
/>
```

### Textarea Component
```typescript
<Textarea
  label="Comments"
  maxLength={500}
  error={error}
  description="Max 500 characters"
  placeholder="Enter text"
/>
```

### Select Component
```typescript
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Tabs Component
```typescript
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Styling Classes Used

### Responsive Utilities
```
xs:      - 375px (custom)
sm:      - 476px (custom)
md:      - 768px (Tailwind default)
lg:      - 1024px (Tailwind default)
xl:      - 1280px (Tailwind default)
2xl:     - 1536px (Tailwind default)
```

### Common Patterns
```
flex h-12 w-full
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
rounded-lg border border-gray-400
bg-primary text-white
hover:bg-primary/90
focus-visible:ring-primary
disabled:opacity-50
md:text-sm
sm:max-h-[calc(100vh-4rem)]
```

## File Organization Best Practices

1. **UI Components** (`/shared/components/ui/`)
   - Base, unstyled components
   - Wrapped with Radix UI
   - Export as named exports

2. **Common Components** (`/shared/components/common/`)
   - Composite components
   - Built from UI components
   - Business logic agnostic

3. **Feature Components** (`/features/*/components/`)
   - Feature-specific components
   - May contain business logic
   - Use hooks from feature folder

4. **Page Components** (`/routes/*/`)
   - Page-level containers
   - Combine features and components
   - Handle routing

5. **Layout Components** (`/shared/components/layout/`)
   - Page templates
   - Nested layouts
   - Outlet providers

---

## Quick Navigation

- Base UI Components: `/app/shared/components/ui/`
- Common Components: `/app/shared/components/common/`
- Icons: `/app/shared/components/icons/`
- Features: `/app/features/`
- Pages: `/app/routes/`
- Layouts: `/app/shared/components/layout/`
