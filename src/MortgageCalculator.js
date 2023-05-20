import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
`;

const Banner = styled.div`
    background-color: #c8102e;
    color: #ffbf00;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2.5em;
`;

const Label = styled.label`
    font-size: 14px;
    color: #c8102e;
    margin: 10px 0;
`;

const Input = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    width: 200px;
    color: #333;
    ::placeholder {
        color: #aaa;
    }
`;

const Select = styled.select`
    margin-bottom: 20px;
    padding: 10px;
    width: 200px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    background-color: #c8102e;
    color: white;
    border: none;
    border-radius: 5px;
`;

const ErrorMessage = styled.p`
    color: red;
`;

function MortgageCalculator() {
    const [homePrice, setHomePrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [error, setError] = useState(null);

    const handleCalculate = () => {
        setError(null);
        if (!homePrice || !downPayment || !interestRate || !loanTerm) {
            setError("All fields are required!");
            return;
        }

        try {
            const principal = homePrice - downPayment;
            const monthlyInterestRate = (interestRate / 100) / 12;
            const numberOfPayments = loanTerm * 12;
            const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments);
            const denominator = Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1;
            const result = (principal * (numerator / denominator)).toFixed(2);
            setMonthlyPayment(result);
        } catch (e) {
            setError("An error occurred during calculation!");
        }
    };

    return (
        <Container>
            <Banner>
                <Title>Mortgage Calculator</Title>
            </Banner>
            <Label>Home Price</Label>
            <Input type="number" placeholder="e.g. 300000" value={homePrice} onChange={e => setHomePrice(e.target.value)} />
            <Label>Down Payment</Label>
            <Input type="number" placeholder="e.g. 60000" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
            <Label>Interest Rate (%)</Label>
            <Input type="number" placeholder="e.g. 3.5" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
            <Label>Loan Term (years)</Label>
            <Select value={loanTerm} onChange={e => setLoanTerm(e.target.value)}>
                <option value="">--Select Loan Term--</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="30">30 Years</option>
            </Select>
            <Button onClick={handleCalculate}>Calculate</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <h3>Monthly Payment: ${monthlyPayment}</h3>
        </Container>
    );
}

export default MortgageCalculator;
