import { Button } from "bootstrap";
import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="PEREDALI STATUS"/>)
        const instance = component.getInstance();  //дайте экз обьекта с которым я взаимодействую
        expect(instance.state.status).toBe("PEREDALI STATUS");
    })

    test("after creation <span> should be displayed ", () => {
        const component = create(<ProfileStatus status="PEREDALI STATUS"/>)
        const root = component.root;  //дайте экз обьекта с которым я взаимодействую
        let span = root.findByType("span")   // в экземпляре обьекта ищем тег span
        expect(span).not.toBeNull(); //не должно быть ноль
    })

    test("after creation <input> shouldn't be displayed ", () => {
        const component = create(<ProfileStatus status="PEREDALI STATUS"/>)
        const root = component.root;  //дайте экз обьекта с которым я взаимодействую
        expect( () => {      /// условие из за которого тест принимает ошибку, а нам ошибку эту получить и нужно
            let input = root.findByType("input");
        }).toThrow()
    })

    test("after creation <span> with status should contains correct status", () => {
        const component = create(<ProfileStatus status="PEREDALI STATUS"/>)
        const instance = component.root;  //дайте экз обьекта с которым я взаимодействую
        let span = instance.findByType("span")   // в экземпляре обьекта ищем тег span
        expect(span.children[0]).toBe("PEREDALI STATUS");   //
    })

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="PEREDALI STATUS"/>)
        const root = component.root;  //дайте экз обьекта с которым я взаимодействую
        let span = root.findByType("span")   // в экземпляре обьекта ищем тег span
        span.props.onDoubleClick() //имитируем двойной клик (функция задана в ProfileStatus и мы через пропсы ею пользуемся)
        let input  = root.findByType("input")   //в тестовом экземпляре дом будем обращатся к типу инпут
        expect(input.props.value).toBe("PEREDALI STATUS");   //
    })

    test("callback shoult be called", () => {  //проверяем колбек функцию deactivateEditMode на вызов
        const mockCallback = jest.fn() //создаем фейковую колбек функцию
        const component = create(<ProfileStatus status="PEREDALI STATUS" updateStatus={mockCallback}/>)
        const instance = component.getInstance();  //дайте экз обьекта с которым я взаимодействую
        instance.deactivateEditMode() 
        expect(mockCallback.mock.calls.length).toBe(1);   //
    })
})