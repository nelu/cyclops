// Vendor
import * as React from 'react';
import styled from 'styled-components';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface Props {
  shrink?: boolean;
  column?: boolean;
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 *
 */
export const FlexBox = styled.div`
  flex: ${
    (props: Props) => props.shrink
      ? '0 0 auto'
      : '1 1 auto'
  };
  overflow: ${
    (props: Props) => props.shrink
      ? 'visible'
      : 'auto'
  };
  display: flex;
  position: relative;
  flex-direction: ${
    (props: Props) => props.column
      ? 'column'
      : 'row'
  };
  align-items: ${ (props: Props) => props.alignItems || 'stretch' };
  justify-content: ${ (props: Props) => props.justifyContent || 'flex-start' };
  align-content: ${ (props: Props) => props.alignContent  || 'stretch' };
`;
