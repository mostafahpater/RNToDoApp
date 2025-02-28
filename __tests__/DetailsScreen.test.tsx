import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import DetailsScreen from '../src/screens/Details';
import axios, { Axios } from 'axios';
jest.mock('@react-navigation/native', () => {
    useNavigation: jest.fn()
})

const createMockNavigation = (): Partial<NavigationProp<any>> => ({
    navigate: jest.fn(),
    goBack: jest.fn()
})

jest.mock('axios')
const initialProps={
    finalSave:jest.fn().mockImplementation(() => Promise.resolve()),
    onClose: jest.fn()
    };
describe('DetailsScreen', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('get data from api',async()=>{
        (axios.get as jest.Mock).mockResolvedValue({
            data:{title:'delectus aut autem'}
        })
        const { getByText } = render(<DetailsScreen navigation={mockNavigation as NavigationProp<any>}/>);
        
        // Wait for the data to be displayed
        await waitFor(() => expect(getByText('delectus aut autem')).toBeTruthy());                           
    })
    const mockNavigation = createMockNavigation()
    it('render Details Screen correctly', async() => {
        const mockNavigation = createMockNavigation()
        
        const { getByText } = render(<DetailsScreen navigation={mockNavigation as NavigationProp<any>} />)

        expect(getByText('Details Screen')).toBeTruthy()
    })

    it('navigates to Home screen on button press', () => {
        const mockNavigation = createMockNavigation()

        const { getByText } = render(<DetailsScreen navigation={mockNavigation as NavigationProp<any>} />)

        fireEvent.press(getByText('Go to Home'))
        expect(mockNavigation.navigate).toBeCalledWith('Home')
    })
})