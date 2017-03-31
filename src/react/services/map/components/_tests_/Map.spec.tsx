// Vendor
import * as React from 'react';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as enzyme from 'enzyme';
import * as bluebird from 'bluebird';

// Local
import { Map } from '../Map';
import * as mapStore from '../../utils/mapStore';

describe('<Map />', () => {
  let wrapper: enzyme.ShallowWrapper<any, any>;
  let setDataSpy: sinon.SinonSpy;
  let createMapItemStub: sinon.SinonStub;
  let getMapItemStub: sinon.SinonStub;
  let removeMapItemStub: sinon.SinonStub;
  let mapStoreItemPromise: bluebird<any>;
  let mapStoreItem: any;

  beforeEach(() => {
    setDataSpy = sinon.spy();
    mapStoreItem = { markerSource: { setData: setDataSpy } };

    mapStoreItemPromise = bluebird.resolve(mapStoreItem);

    createMapItemStub = sinon
      .stub(mapStore, 'createMapItem')
      .returns(mapStoreItemPromise);

    getMapItemStub = sinon
      .stub(mapStore, 'getMapItem')
      .returns(mapStoreItemPromise);

    removeMapItemStub = sinon.stub(mapStore, 'removeStub');
  });

  afterEach(() => {
    createMapItemStub.restore();
    getMapItemStub.restore();
    removeMapItemStub.restore();
  });

  it('should create a div with a random id', () => {
    wrapper = enzyme.shallow(<Map />);

    const id = wrapper.prop('id');

    chai.expect(wrapper.type()).to.equal('div');
    chai.expect(id).to.be.a('string');
    chai.expect(id.slice(0, 2)).to.equal('id');
  });

  it('should pass the markers to the map', () => {
    const markers: any = {};

    enzyme.mount(<Map markers={markers} />);
    mapStoreItemPromise.then(() => {
      chai.expect(setDataSpy.args[0][0]).to.be(markers);
    });
  });

  it('should pass in the map options to the map', () => {
    const options: any = {};

    enzyme.mount(<Map options={options} />);
    console.log(createMapItemStub.args[0][1]);
    chai.expect(createMapItemStub.args[0][1]).to.be(options);
  });
});