import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from "@storybook/addon-actions";
import { Task, TaskPropsType } from "../Task";


export default {
    title: 'Todolists/Task',
    component: Task,
    argTypes: {},
    // args: {
    //   removeTask: action('Title changed inside Task'),
    //   changeTaskStatus: action('Remove button inside Task clicked'),
    //   changeTaskTitle: action('Status changed inside Task'),
    // }
} as Meta;

const removeTaskCallback = action('Title Remove inside Task')
const changeTaskStatusCallback = action('Changed button inside Task clicked')
const changeTaskTitleCallback = action('Status changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const argsBase = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...argsBase,
    task: { id: '1', isDone: true, title: 'JS' },
    todolistId: '1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...argsBase,
    task: { id: '2', isDone: false, title: 'HTML' },
    todolistId: '2'
};
