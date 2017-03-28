/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import * as React from 'react';
import * as Formatter from 'json-formatter-js';
import * as _ from 'lodash';

// Local
import { orderKeys } from '../utils/orderKeys';
import { createRandomId } from '../utils/createRandomId';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** JSONFormatter component properties. */
interface Props {
  /** Data to display. */
  json?: any;
  /** How many levels deep the object should open on initial display. */
  open?: number;
  /** Formatter configuration object. */
  config?: Formatter.Configuration;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Creates a block of pretty printed and collapsible object content.
 */
export class JSONFormatter extends React.Component<Props, {}> {
  /**
   * Default formatter config for all formatter instances.
   * @type {Formatter.Configuration}
   */
  public static DEFAULT_FORMATTER_CONFIG: Formatter.Configuration = {
    animateClose: false,
    animateOpen: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewEnabled: false,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
  };

  /**
   * Default open level for all formatter instances.
   * @type {number}
   */
  public static DEFAULT_OPEN: number = 1;

  /**
   * ID of the created JSON formatter container.
   */
  public id: string;

  constructor(props: Props) {
    super(props);

    this.id = createRandomId();
  }

  /**
   * Sets the rendered HTML to the element once the component mounts.
   */
  public componentDidMount(): void {
    this.createHTML(this.props.json, this.props.open, this.props.config);
  }

  /**
   * Re-renders and replaces the current HTML with new HTML if the
   * new props don't match.
   * @param {Props} nextProps The new props being passed in.
   */
  public componentWillReceiveProps(nextProps: Props): void {
    if (!_.isEqual(nextProps, this.props)) {
      this.createHTML(nextProps.json, nextProps.open, nextProps.config);
    }
  }

  /**
   * Turns off component re-rendering. All the rendering is handled in
   * componentWillReceiveProps.
   * @return {boolean} If the component should re-render.
   */
  public shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * Clears the div element, creates the JSON html, and then places the
   * rendered html into the div element.
   * @param json
   * @param open
   * @param config
   */
  public createHTML = (
    json: any,
    open?: number,
    config?: Formatter.Configuration,
  ): void => {
    const extendedConfig = config
      ? Object.assign({}, JSONFormatter.DEFAULT_FORMATTER_CONFIG, config)
      : JSONFormatter.DEFAULT_FORMATTER_CONFIG;
    const orderedJSON = orderKeys(json);
    const formatter = new Formatter(
      orderedJSON,
      open || JSONFormatter.DEFAULT_OPEN,
      extendedConfig,
    );
    const element = document.getElementById(this.id);

    if (element) {
      while (element.firstChild) element.removeChild(element.firstChild);

      element.appendChild(formatter.render());
    }
  };

  /**
   * Renders the JSON container with the given document ID.
   */
  public render() {
    return <div id={this.id} />;
  }
}
