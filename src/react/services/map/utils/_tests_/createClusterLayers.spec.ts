// Vendor
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as _ from 'lodash';

// Local
import { createClusterLayers } from '../createClusterLayers';
import { CLUSTER_LAYERS } from '../../constants';

describe('createClusterLayers', () => {
  it('should create the same number of layers outlined in CLUSTER_LAYERS ' +
    'plus an extra one for unclustered layers', () => {
    const expectedLength = CLUSTER_LAYERS.length + 1;
    const layersLength = createClusterLayers('test').length;

    chai.expect(layersLength).to.equal(expectedLength);
  });

  it('should name each layer id by it\'s index and the last one should be ' +
    'called count', () => {
    const sourceId = 'test';
    const layers = createClusterLayers(sourceId);

    layers.forEach((layer, index) => {
      if (index + 1 === layers.length) {
        chai.expect(layer.id).to.equal(`${sourceId}-cluster-count`);
      } else {
        chai.expect(layer.id).to.equal(`${sourceId}-cluster-${index}`);
      }
    });
  });

  it('should have every source be the source id', () => {
    const layers = createClusterLayers('test');

    layers.forEach((layer) => {
      chai.expect(layer.source).to.equal('test');
    });
  });

  it('should paint the circle the appropriate layer color', () => {
    const layers = createClusterLayers('test');

    layers.forEach((layer, index) => {
      if (index + 1 === layers.length) {
        chai.expect(layer.paint).to.be.undefined;
      } else {
        const paint = layer.paint;
        const color = paint ? _.get(paint, 'circle-color') : undefined;

        chai.expect(color).to.equal(CLUSTER_LAYERS[index].color);
      }
    });
  });
});