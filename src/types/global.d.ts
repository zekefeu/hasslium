export type directiveType = [directive: string, arguments: string];

export type macroType = [macro: string, token: string];

export interface processOptions {
	macros?: macroType[];
	verbose?: boolean;
}
