import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function OrderForm({
  orderDescription,
  handleInputChange,
  handleCreateOrder,
  indicationBulb,
  setIndicationBulb,
}) {
  const createBtnDisabled = orderDescription.trim() === "";
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/admin/");
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
      >
        <Form.Group>
          <label
            htmlFor="orderDescription"
            className="block text-gray-200 mb-4 mt-4"
          >
            Share your film ideas and expectations with us. Let us know the
            occasion, desired effects, mood, and expected duration for your
            shoot
          </label>
          <textarea
            name="orderDescription"
            id="orderDescription"
            placeholder="Type here"
            className=" border-blue-500 border bg-[#060f25] rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            maxLength={2000}
            value={orderDescription}
            onChange={(e) =>
              handleInputChange(e, {
                name: "orderDescription",
                value: e.target.value,
              })
            }
            rows={5}
          />
          <select
            className="text-gray-200 bg-[#060f25] text-sm appearance-none border rounded w-full py-2 px-3 mb-4 mt-4 leading-tight focus:outline-none focus:shadow-outline"
            value={indicationBulb}
            onChange={(event) => setIndicationBulb(event.target.value)}
            id="indicationBulb"
          >
            <option value="OPEN">OPEN</option>
            <option value="ONGOING">ONGOING</option>
            <option value="FINISHED">FINISHED</option>
          </select>
        </Form.Group>
        <div className="flex justify-end">
          <Button
            icon
            labelPosition="right"
            disabled={createBtnDisabled}
            onClick={handleCreateOrder}
            className="lg:w-1/3 md:w-1/4 sm:w-1/4 border-blue-500 bg-transparent text-gray-200 lg:p-2 md:p-2 sm:p-1 hover:bg-blue-500 rounded-lg hover:text-gray-200"
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default OrderForm;
