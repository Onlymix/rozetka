import { InjectionKey } from 'vue'
import { User } from './types'
import { UnwrapNestedRefs } from '@vue/reactivity'

export const UserKey: InjectionKey<UnwrapNestedRefs<User>> = Symbol('User')
