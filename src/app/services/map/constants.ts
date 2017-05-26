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

// Local
import { ClusterLayer } from './types';

/**
 * Default options for creating mapbox maps.
 * @type {{style: string}}
 */
export const DEFAULT_MAP_OPTIONS: mapboxgl.MapboxOptions = {
  style: 'mapbox://styles/mapbox/dark-v9',
};

/**
 * Layer options to use to make cluster layers.
 */
export const CLUSTER_LAYERS: ClusterLayer[] = [
  { markerMinimum: 50, color: '#f28cb1' },
  { markerMinimum: 25, color: '#f1f075' },
  { markerMinimum: 0, color: '#51bbd6' },
];

/**
 * Options for clustering markers.
 */
export const CLUSTER_OPTIONS = {
  clusterMaxZoom: 14,
  clusterRadius: 50,
};

export const FAKE_MARKERS = {
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "EPSG:4326"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "[https://t.co/FVk2bWWbek] Cyphon - An Open Source Incident Management and Response Platform https://t.co/NFT0m6u1zT",
        "incidents": 1,
        "pk": "35606"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          26.09870911,
          44.42701324
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 1,
        "pk": "19900"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 7,
        "pk": "19899"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -86.3273,
          35.7809
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 25,
        "pk": "19898"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -88.2049,
          41.8251
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "@DunbarCareers photo shoot! (at @DunbarArmored in Timonium, MD) https://t.co/ivjpE9O7Kq",
        "incidents": 1,
        "pk": "19802"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.64292106,
          39.45355099
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 12,
        "pk": "19761"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -86.3273,
          35.7809
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 12,
        "pk": "19717"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -88.2049,
          41.8251
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 20,
        "pk": "19708"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 12,
        "pk": "19707"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -88.2049,
          41.8251
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "Snort Alert",
        "incidents": 1,
        "pk": "19535"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.0574,
          37.419200000000004
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 2,
        "pk": "19531"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 4,
        "pk": "19530"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: CHUNKED ENCODING - EXCESSIVE CONSECUTIVE SMALL CHUNKS",
        "incidents": 16,
        "pk": "19518"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.4728,
          39.0481
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 14,
        "pk": "19504"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 15,
        "pk": "19503"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 14,
        "pk": "19502"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 32,
        "pk": "19501"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 14,
        "pk": "19500"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 16,
        "pk": "19498"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 14,
        "pk": "19497"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 12,
        "pk": "19481"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "LOW",
        "title": "http_inspect: POST W/O CONTENT-LENGTH OR CHUNKS",
        "incidents": 15,
        "pk": "19480"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "MEDIUM",
        "title": "sip: URI is too long",
        "incidents": 2,
        "pk": "19469"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -93.6091,
          41.6005
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "level": "MEDIUM",
        "title": "sip: Empty request URI",
        "incidents": 6,
        "pk": "19465"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.822,
          37.751
        ]
      }
    }
  ]
};
