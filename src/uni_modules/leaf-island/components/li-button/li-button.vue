<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonHTMLType, ButtonSize, ButtonType } from './types';

interface Props {
	type?: ButtonType;
	size?: ButtonSize;
	danger?: boolean;
	ghost?: boolean;
	block?: boolean;
	loading?: boolean;
	disabled?: boolean;
	htmlType?: ButtonHTMLType;
	// 小程序特有属性支持
	openType?: string;
	hoverClass?: string;
	hoverStartTime?: number;
	hoverStayTime?: number;
	appParameter?: string;
	sendMessageTitle?: string;
	sendMessagePath?: string;
	sendMessageImg?: string;
	showMessageCard?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'default',
	size: 'middle',
	danger: false,
	ghost: false,
	block: false,
	loading: false,
	disabled: false,
	htmlType: 'button',
	openType: '',
	hoverClass: 'animal-btn--active',
	hoverStartTime: 20,
	hoverStayTime: 70,
	appParameter: '',
	sendMessageTitle: '',
	sendMessagePath: '',
	sendMessageImg: '',
	showMessageCard: false,
});

const emit = defineEmits<{
	(e: 'click', event: any): void;
	(e: 'getphonenumber', event: any): void;
	(e: 'getuserinfo', event: any): void;
	(e: 'opensetting', event: any): void;
	(e: 'launchapp', event: any): void;
	(e: 'contact', event: any): void;
	(e: 'chooseavatar', event: any): void;
	(e: 'error', event: any): void;
}>();

defineSlots<{ default?: () => unknown; icon?: () => unknown }>();

// #ifdef H5
const isH5 = true;
// #endif
// #ifndef H5
const isH5 = false;
// #endif

const handleClick = (event: any) => {
	if (props.disabled || props.loading) {
		return;
	}
	emit('click', event);
};
</script>

<template>
	<button
		:type="isH5 ? htmlType : undefined"
		:form-type="!isH5 && htmlType !== 'button' ? htmlType : undefined"
		:disabled="disabled || loading"
		:open-type="openType || undefined"
		:app-parameter="appParameter || undefined"
		:send-message-title="sendMessageTitle || undefined"
		:send-message-path="sendMessagePath || undefined"
		:send-message-img="sendMessageImg || undefined"
		:show-message-card="showMessageCard"
		:hover-class="disabled || loading ? 'none' : hoverClass"
		:hover-start-time="hoverStartTime"
		:hover-stay-time="hoverStayTime"
		class="animal-btn"
		:class="[
			`animal-btn--${size}`,
			`animal-btn--${type}`,
			{
				'animal-btn--danger': danger,
				'animal-btn--ghost': ghost,
				'animal-btn--block': block,
				'animal-btn--loading': loading,
			},
		]"
		@click="handleClick"
		@getphonenumber="emit('getphonenumber', $event)"
		@getuserinfo="emit('getuserinfo', $event)"
		@opensetting="emit('opensetting', $event)"
		@launchapp="emit('launchapp', $event)"
		@contact="emit('contact', $event)"
		@chooseavatar="emit('chooseavatar', $event)"
		@error="emit('error', $event)"
	>
		<text v-if="$slots.icon && !loading" class="animal-btn__icon">
			<slot name="icon" />
		</text>
		<text v-if="$slots.default">
			<slot />
		</text>
	</button>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-btn {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-sm;
	font-family: @font-family;
	font-weight: 600;
	white-space: nowrap;
	cursor: pointer;
	border: @border-width solid transparent;
	border-radius: 50px;
	transition: all @motion-duration-base @motion-ease;
	user-select: none;
	outline: none;
	line-height: 1;
	letter-spacing: 0.02em;
	box-shadow: @shadow-sm;

	&:focus-visible {
		outline: 2px solid @primary-color;
		outline-offset: 2px;
	}

	&:disabled:not(.animal-btn--loading) {
		cursor: not-allowed;
		opacity: 0.5;
		box-shadow: none;
	}

	// ---------- Size ----------
	&--small {
		height: @height-sm;
		padding: 0 @spacing-lg;
		font-size: @font-size-sm;
		border-radius: @border-radius-sm;
	}

	&--middle {
		height: 45px;
		padding: 0 20px;
		font-size: @font-size-base;
	}

	&--large {
		height: @height-lg;
		padding: 0 32px;
		font-size: @font-size-lg;
		border-radius: @border-radius-lg;
	}

	// ---------- Type: default ----------
	&--default {
		color: @text-color;
		background: @bg-color;
		border-color: @border-color;

		&:hover:not(:disabled) {
			color: @primary-color;
			border-color: @primary-color;
			box-shadow: @shadow-base;
			transform: translateY(-1px);
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			color: @primary-color-active;
			border-color: @primary-color-active;
			transform: translateY(0);
			box-shadow: @shadow-sm;
		}
	}

	// ---------- Type: primary ----------
	&--primary {
		color: @warm-color;
		background: @cream-color;
		border-color: @cream-color;
		box-shadow: 0 5px 0 0 @shadow-warm;

		&:hover:not(:disabled) {
			transform: translateY(-1px);
			box-shadow: 0 6px 0 0 @shadow-warm;
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			transform: translateY(2px);
			box-shadow: 0 1px 0 0 @shadow-warm;
		}
	}

	// ---------- Type: dashed ----------
	&--dashed {
		color: @text-color;
		background: @bg-color;
		border-color: @border-color;
		border-style: dashed;

		&:hover:not(:disabled) {
			color: @primary-color;
			border-color: @primary-color;
			transform: translateY(-1px);
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			color: @primary-color-active;
			border-color: @primary-color-active;
			transform: translateY(0);
		}
	}

	// ---------- Type: text ----------
	&--text {
		color: @text-color;
		background: transparent;
		border-color: transparent;
		box-shadow: none;

		&:hover:not(:disabled) {
			background: @bg-color-secondary;
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			background: darken(@bg-color-secondary, 5%);
		}
	}

	// ---------- Type: link ----------
	&--link {
		color: @primary-color;
		background: transparent;
		border-color: transparent;
		box-shadow: none;

		&:hover:not(:disabled) {
			color: @primary-color-hover;
			opacity: 0.85;
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			color: @primary-color-active;
		}
	}

	// ---------- Danger ----------
	&--danger.animal-btn--primary {
		color: #fff;
		background: @error-color;
		border-color: @error-color;
		box-shadow: 0 5px 0 0 @error-color-active;

		&:hover:not(:disabled) {
			background: @error-color-hover;
			border-color: @error-color-hover;
			box-shadow: 0 6px 0 0 @error-color-active;
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			background: @error-color-active;
			border-color: @error-color-active;
			box-shadow: 0 1px 0 0 @error-color-active;
		}
	}

	&--danger.animal-btn--default,
	&--danger.animal-btn--dashed {
		color: @error-color;
		border-color: @error-color;

		&:hover:not(:disabled) {
			color: @error-color;
			border-color: @error-color-hover;
		}

		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			color: @error-color;
			border-color: @error-color-active;
		}
	}

	&--danger.animal-btn--text,
	&--danger.animal-btn--link {
		color: #fff;

		&:hover:not(:disabled),
		&:active:not(:disabled),
		&.animal-btn--active:not(:disabled) {
			color: #fff;
		}
	}

	// ---------- Ghost ----------
	&--ghost {
		background: transparent;
		box-shadow: none;
	}

	&--ghost.animal-btn--primary {
		color: @primary-color;
		background: transparent;
		box-shadow: none;

		&:hover:not(:disabled) {
			color: @primary-color-hover;
			border-color: @primary-color-hover;
			background: rgba(25, 200, 185, 0.08);
		}
	}

	// ---------- Block ----------
	&--block {
		display: flex;
		width: 100%;
	}

	// ---------- Loading ----------
	&--loading {
		cursor: default;
		pointer-events: none;
		box-shadow: none;
		background: #0ec4b6;
		border: 4px solid #4de2da;
		color: #fff;
		background-image: repeating-linear-gradient(-45deg,
				#0ec4b6,
				#0ec4b6 10px,
				#01b0a7 10px,
				#01b0a7 20px);
		background-size: 28.28px 28.28px;
		animation: animal-btn-loading 1s linear infinite;
	}

	&__icon {
		display: inline-flex;
		align-items: center;
	}
}

@keyframes animal-btn-loading {
	0% {
		background-position: 0 0;
	}

	100% {
		background-position: -28.28px 0;
	}
}
</style>
