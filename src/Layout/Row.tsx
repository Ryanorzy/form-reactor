import React from 'react'
import styled from 'styled-components';


export const TwoColumnRow = styled.div` &&& {
    display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: left;
	justify-items:left;
}`;

export const ThreeColumnRow = styled.div` &&& {
    display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: left;
	justify-items:left;
}`;
