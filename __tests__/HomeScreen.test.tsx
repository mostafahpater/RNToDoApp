import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import HomeScreen from '../src/screens/Home/index';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

jest.mock('@react-navigation/native',()=>{
    useNavigation:jest.fn()
})

// Mock the navigation object
const createMockNavigation = (): Partial<NavigationProp<any>> => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    // Add more navigation functions if needed
  });

describe('HomeScreen',()=>{
    it('renders correctly',()=>{
        const mockNavigation = createMockNavigation()
        const {getByText} = render(<HomeScreen navigation={mockNavigation as NavigationProp<any>}/>)
        expect(getByText('Home Screen')).toBeTruthy()
    })

    it('navigates to Details screen on button press',()=>{
        const mockNavigation = createMockNavigation()

        const { getByText  } = render(<HomeScreen navigation={mockNavigation as NavigationProp<any>} />);

        fireEvent.press(getByText('Go to Details'))
    
        expect(mockNavigation.navigate).toBeCalledWith('Details');
    })
})