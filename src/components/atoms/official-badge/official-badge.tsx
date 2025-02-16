// src/components/atoms/official-badge.tsx

import { component$ } from '@builder.io/qwik';
import { VerifiedIcon } from '~/components/atoms/Icons/VerifiedIcon';

export const OfficialBadge = component$(() => {
    return (
      <span class="official-badge">
        <VerifiedIcon />
        Official Model
      </span>
    );
  });