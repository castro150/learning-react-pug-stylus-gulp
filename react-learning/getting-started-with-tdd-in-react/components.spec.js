import React from 'react';
import { expect } from 'chai';
import { spy, mock } from 'sinon';
import { shallow, mount } from 'enzyme';
import { BeerListContainer } from './components';
import { InputArea, BeerList } from './components';

describe('BeerListContainer', () => {
  it('should render InputArea and BeerList', () => {
    const wrapper = shallow(<BeerListContainer/>);
    expect(wrapper.containsAllMatchingElements([
      <InputArea/>,
      <BeerList/>
    ])).to.equal(true);
  });

  it('should start with an empty list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    expect(wrapper.state('beers')).to.eql([]);
  });

  it('adds items to the list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    wrapper.instance().addItem('Sam Adams');
    expect(wrapper.state('beers')).to.eql(['Sam Adams']);
  });

  it('passes addItem to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    expect(inputArea.prop('onSubmit')).to.eql(addItem);
  });

  it('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Sam Adams');
    expect(wrapper.state('beers')).to.eql(['Sam Adams']);
  });

  it('pass items to BeerList', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const beerList = wrapper.find(BeerList);
    const items = wrapper.state('beers');
    expect(beerList.prop('items')).to.eql(items);
  });
});

describe('InputArea', () => {
  it('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea/>);
    expect(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>
    ])).to.equal(true);
  });

  it('should accept input', () => {
    const wrapper = mount(<InputArea/>);
    const input = wrapper.find('input');
    input.simulate('change', {target: { value: 'Resin' }});
    expect(wrapper.state('text')).to.equal('Resin');
    expect(input.prop('value')).to.equal('Resin');
  });

  it('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({text: 'Octoberfest'});
    const addButton = wrapper.find('button');
    addButton.simulate('click');
    expect(addItemSpy.calledOnce).to.equal(true);
    expect(addItemSpy.calledWith('Octoberfest')).to.equal(true);
  });

  it('should clear the input when Add is clicked', () => {
    const wrapper = mount(<InputArea onSubmit={mock()}/>);
    const input = wrapper.find('input');
    const addButton = wrapper.find('button');
    input.simulate('change', {target: { value: 'Resin' }});
    addButton.simulate('click');
    expect(wrapper.state('text')).to.equal('');
    expect(input.prop('value')).to.equal('');
  });
});

describe('BeerList', () => {
  it('should render zero items', () => {
    const wrapper = shallow(<BeerList items={[]}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render undefined items', () => {
    const wrapper = shallow(<BeerList items={undefined}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render the items', () => {
    const items = ['Sam Adams', 'Resin', 'Octoberfest'];
    const wrapper = shallow(<BeerList items={items}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });
});
