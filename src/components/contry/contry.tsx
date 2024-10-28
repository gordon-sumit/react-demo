import { useState } from "react";

export default function FormComponent() {
    const [fields, setFields] = useState([{ name: '', amount: 0 }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [balanceSummary, setBalanceSummary] = useState([]);

    const addMore = () => {
        setFields([...fields, { name: '', amount: 0 }]);
    };

    const remove = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index, event) => {
        const values = [...fields];
        values[index][event.target.name] = event.target.value;
        setFields(values);
    };

    const calculateBalances = (e) => {
        e.preventDefault();

        const total = parseFloat(totalAmount);
        const equalContribution = total / fields.length;

        const balances = fields.map(field => {
            const balance = parseFloat(field.amount) - equalContribution;
            return {
                name: field.name,
                balance: balance.toFixed(2) // round to 2 decimal places
            };
        });

        setBalanceSummary(balances);
    };

    return (
        <div className="container mt-5">
            <form onSubmit={calculateBalances}>
                <div className="form-group">
                    <label htmlFor="totalAmount">Total Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalAmount"
                        placeholder="Enter total amount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                </div>
                <div id="repeatedFields">
                    {fields.map((item, index) => (
                        <div className="form-row align-items-center mb-2" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="name"
                                        value={item.name}
                                        onChange={(e) => handleFieldChange(index, e)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        name="amount"
                                        value={item.amount}
                                        onChange={(e) => handleFieldChange(index, e)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={addMore}>
                        Add More
                    </button>
                </div>
                <button type="submit" className="btn btn-success">
                    Calculate
                </button>
            </form>

            {balanceSummary.length > 0 && (
                <div className="mt-4">
                    <h3>Balance Summary</h3>
                    <ul className="list-group">
                        {balanceSummary.map((item, index) => (
                            <li key={index} className="list-group-item">
                                {item.name} {item.balance > 0 ? 'will receive' : 'owes'} <strong>Rs {Math.abs(item.balance)}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
