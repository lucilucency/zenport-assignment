import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {localEditBooking} from '../actions';

const Styled = styled.div`
label span {
  float: right;
}
`;

class Step1 extends Component {
  submit = (e) => {
    e.preventDefault();
    this.validateAll((errors) => {
      if (!errors.length) {
        this.doSubmit();
      }
    });
  };
  /** DO SUBMIT
   * */
  doSubmit = () => {
    // TODO: submit data (APIs)

    this.props.onSubmit(true);
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        ...Step1.initFormData,
        ...props.booking,
      },
      formValidators: Step1.initFormValidators,
      formErrors: Step1.initFormErrors,
    };
  }

  componentDidMount() {
    this.props.setTrigger(this.submit);
  }

  getFormData() {
    return {
      ...this.state.formData
    };
  }

  render() {
    const { booking } = this.props;
    return (
      <Styled>
        <div>
          <label>
            Meal
            <span style={{ textTransform: 'capitalize' }}>{booking.meal}</span>
          </label>
        </div>
        <div>
          <label>
            No of People
            <span>{booking.people}</span>
          </label>
        </div>
        <div>
          <label>
            Restaurant
            <span>{booking.restaurant}</span>
          </label>
        </div>
        <div>
          <label>
            Dishes
            <ul>
              {booking.orders.map(order => (
                <li key={order.selected}>
                  <label>{order.selected} <span>{order.servings}</span></label>
                </li>
              ))}
            </ul>
          </label>
        </div>
      </Styled>
    );
  }
}

Step1.propTypes = {
  setTrigger: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  /**/
  dishes: PropTypes.array,
  booking: PropTypes.object,
  localEditBooking: PropTypes.func,
};

const mapStateToProps = state => ({
  dishes: state.app.dishes.data,
  booking: state.app.booking.data,
});

const mapDispatchToProps = dispatch => ({
  localEditBooking: payload => dispatch(localEditBooking(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
