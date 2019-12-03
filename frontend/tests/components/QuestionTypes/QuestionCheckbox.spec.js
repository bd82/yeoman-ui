import QuestionCheckbox from '../../../src/components/QuestionTypes/QuestionCheckbox.vue'
import { BFormCheckboxGroup } from 'bootstrap-vue'
import { initComponent, destroy } from '../../Utils'
import _ from 'lodash'

let wrapper


describe('QuestionCheckbox.vue', () => {
    afterEach(() => {
        destroy(wrapper)
    })

    describe('selected - data', () => {
        test('selected is empty array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [
                        { value: 'testValue1', name: 'testName1', checked: false, text: 'testText1' },
                        { value: 'testValue2', name: 'testName2', checked: false, text: 'testText2' }
                    ]
                }
            })

            expect(wrapper.vm.selected).toHaveLength(0)
        })

        test('selected is not empty array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [
                        { value: 'testValue1', name: 'testName1', checked: false, text: 'testText1' },
                        { value: 'testValue2', name: 'testName2', checked: true, text: 'testText2' }
                    ]
                }
            })

            expect(wrapper.vm.selected).toHaveLength(1)
        })
    })

    test('selected - watcher', async () => {
        wrapper = initComponent(QuestionCheckbox, {
            currentQuestion: {
                choices: [
                    { value: 'testValue1', name: 'testName1', checked: true, text: 'testText1' },
                    { value: 'testValue2', name: 'testName2', checked: true, text: 'testText2' }
                ]
            }
        })

        expect(wrapper.vm.currentQuestion.answer).toHaveLength(2)
        const selected = wrapper.vm.selected
        selected.pop()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentQuestion.answer[0]).toBe('testValue1')
    })

    describe('checkboxFilter - filter', () => {
        test('choice without text property', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [{ value: 'testValue1', name: 'testName1', checked: true }]
                }
            })

            expect(wrapper.vm.currentQuestion.choices[0].text).toBe('testName1')
        })

        test('choices is not array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: { value: 'testValue1', name: 'testName1', checked: true }
                }
            })

            expect(wrapper.vm.currentQuestion.choices.text).toBeUndefined()
        })
    })
})
