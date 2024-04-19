import { type ModulePagingParams, type Paging } from "@/models"
import { type } from "os"

export interface SourceType {
  id: string
  modified?: string
  modifiedBy?: string
  isActive?: boolean
  name?: string
  description?: string
  module?: string
}

export interface SourceFormType {
  id?: SourceType['id']
  name?: SourceType['name']
  description?: SourceType['description']
  isActive?: SourceType['isActive']
  module?: SourceType['module']
}

export type SourcePagingParams = ModulePagingParams

export type SourcePagingType = Paging<SourceType>