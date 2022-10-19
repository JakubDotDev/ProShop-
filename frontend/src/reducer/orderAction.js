import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_PAY_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: "ORDER_PAY_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const orderProfileList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_PROFILE_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`,config);

    dispatch({
      type: "ORDER_PROFILE_LIST_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_PROFILE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const orderAdminList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_ADMIN_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({
      type: "ORDER_ADMIN_LIST_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_ADMIN_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DELIVER_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

    dispatch({
      type: "ORDER_DELIVER_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
