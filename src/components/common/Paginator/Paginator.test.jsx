import React from "react";
import { create } from "react-test-renderer"
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
    test("pages count is 51 but should be showed only 50", () => {
        const component = create(<Paginator totalItemCount={51} pageSize={1} portionSize={50} />)
        const root = component.root
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(50)
    });

    test("if pages count is more then 10 button 'NEXT' shoult be present", () => {
        const component = create(<Paginator totalItemCount={11} pageSize={1} portionSize={10} />)
        const root = component.root
        let button = root.findAllByType("button")
        expect(button.length).toBe(1)
    })
})