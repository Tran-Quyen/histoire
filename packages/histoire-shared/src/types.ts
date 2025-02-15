export interface StoryFile {
  id: string
  supportPluginId: string
  component: any
  story: Story
  path: string[]
}

export type StoryLayout = {
  type: 'single'
  iframe?: boolean
} | {
  type: 'grid'
  width?: number | string
}

export interface Story {
  id: string
  title: string
  group?: string
  variants: Variant[]
  layout?: StoryLayout
  icon?: string
  iconColor?: string
  docsOnly?: boolean
  file?: StoryFile
  lastSelectedVariant?: Variant
  slots?: () => Readonly<any>
}

export interface Variant {
  id: string
  title: string
  icon?: string
  iconColor?: string
  setupApp?: (payload: any) => unknown
  slots?: () => Readonly<any>
  state: any
  source?: string
  responsiveDisabled?: boolean
  autoPropsDisabled?: boolean
  configReady?: boolean
  previewReady?: boolean
}

export interface PropDefinition {
  name: string
  types?: string[]
  required?: boolean
  default?: any
}

export interface AutoPropComponentDefinition {
  name: string
  index: number
  props: PropDefinition[]
}

/* SERVER */

export interface ServerStoryFile {
  id: string
  /**
   * Absolute path
   */
  path: string
  /**
   * File name without extension
   */
  fileName: string
  /**
   * Support plugin (Vue, Svelte, etc.)
   */
  supportPluginId: string
  /**
   * Generated path for tree UI
   */
  treePath?: string[]
  /**
   * Use the module id in imports to allow HMR
   */
  moduleId: string
  /**
   * Resolved story data from story file execution
   */
  story?: ServerStory
  /**
   * Data sent to user tree config functions
   */
  treeFile?: ServerTreeFile
}

export interface ServerStory {
  id: string
  title: string
  group?: string
  variants: ServerVariant[]
  layout?: {
    type: 'single'
  } | {
    type: 'grid'
    width?: number | string
  }
  icon?: string
  iconColor?: string
  docsOnly?: boolean
  docsText?: string
}

export interface ServerVariant {
  id: string
  title: string
  icon?: string
  iconColor?: string
}

export interface ServerTreeFile {
  title: string
  path: string
}

export interface ServerTreeLeaf {
  title: string
  index: number
}

export interface ServerTreeFolder {
  title: string
  children: (ServerTreeFolder | ServerTreeLeaf)[]
}

export interface ServerTreeGroup {
  group: true
  id: string
  title: string
  children: (ServerTreeFolder | ServerTreeLeaf)[]
}

export type ServerTree = (ServerTreeGroup | ServerTreeFolder | ServerTreeLeaf)[]

export interface ServerRunPayload {
  file: ServerStoryFile
  storyData: ServerStory[]
  el: HTMLElement
}

export interface SupportPlugin {
  id: string
  moduleName: string
  setupFn: string
  importStoriesPrepend?: string
  importStoryComponent: (file: ServerStoryFile, index: number) => string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FinalSupportPlugin extends SupportPlugin {
  // For now, no additional properties
}
