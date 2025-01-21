<script lang="ts">
	import Spinner from '$lib/components/common/Spinner.svelte';
	import Coin from "$lib/components/common/Coin.svelte";

	export let caption: string | number;
	export let isLoading: boolean = false;
	export let withCoin: boolean = false;
	export let id:string = '';
	export let textStyles:string = ''
	export let wrapBtnStyles:string = ''
	export let variant: "default" | "blue" | 'black'
	export let disabled: boolean = false;

	const handleStylesByVariant = {
		default:
			`main-btn_accent`,
		blue: `
			main-btn_blue_gradient
		`,
		black: `main-btn_black_gradient`
	}

</script>

{#if !isLoading}
		<div style='' class="w-full h-full relative  flex flex-row justify-center items-center {!isLoading
					? 'animate-updated-button'
					: ''}">
			<button
				on:click
				{disabled}
				id={id}
				style="{wrapBtnStyles}  "
				class="{handleStylesByVariant[variant]} w-full h-full relative flex flex-row justify-center items-center father-anima z-[2] main-btn "
			>
				<div style={textStyles} class=" absolute w-full h-full flex justify-center items-center  gap-[4px] text-center font-['Poppins']  ">
					{#if withCoin}
						<span style={textStyles}>
							<Coin className="h-full aspect-ratio-[1/1] " />
						</span>

					{/if}
					<span>{caption}</span>
				</div>
			</button>
			<div
				style=''
				class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
			></div>
		</div>
{:else}
	<Spinner></Spinner>
{/if}

<style lang="scss">
	.main-btn {
		position: relative;
	    overflow: hidden;
		span {
			position: relative;
			z-index: 2;
		}
		&_accent {
			border: 1px solid #4F44B6;
			background: linear-gradient(90deg, #272D3F 0%, #161924 100%);
			&:after, &:before {
			  content: '';
			  display: block;
			  width: 100%;
              height: 100%;
              z-index: 0;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
			  pointer-events: none;
			  transition: all .4s ease;
			}
		    &:after {
              background: linear-gradient(289deg, #313D63 0.74%, #161924 107.39%), linear-gradient(90deg, #272D3F 0%, #161924 100%);
			}
		    &:before {
              background: linear-gradient(90deg, #272D3F 0%, #161924 100%), linear-gradient(0deg, #0B0D13 0%, #090B0F 100%);
              z-index: 1;
			}
			&:hover{
				border: 1px solid #6D5FEF;
				&:after {
                  opacity: 1;
				}
			}
			&:active{
				border: 1px #090813 solid;
				  &:before {
					opacity: 1;
				  }
			}
			&:disabled{
        border: 1px solid #4F44B6;
        background: linear-gradient(90deg, #272D3F 0%, #161924 100%);
				pointer-events: none;
				opacity: 0.3;
			}
		}
		&_blue_gradient {
			background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);
      &:after, &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        transition: all .4s ease;
      }
      &:after {
        background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);
      }
      &:before {
        background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%), radial-gradient(41.67% 77.71% at 10.91% 38.85%, #AA75FF 0%, #834EFF 100%);
        z-index: 1;
      }
      &:hover{
        &:after {
          opacity: 1;
        }
      }
      &:active{
        background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%), radial-gradient(41.67% 77.71% at 10.91% 38.85%, #AA75FF 0%, #834EFF 100%), linear-gradient(0deg, #4931B6 0%, #3F27A6 100%);
        &:before {
          opacity: 1;
        }
      }
      &:disabled{
        background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);
        pointer-events: none;
        opacity: 0.3;
      }
		}

		&_black_gradient {
      background: #050505;
			border: 1px #272A30 solid;
      &:after, &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        transition: all .4s ease;
      }
      &:after {
        background: #12131B;
      }
      &:before {
        background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%), radial-gradient(41.67% 77.71% at 10.91% 38.85%, #AA75FF 0%, #834EFF 100%);
        z-index: 1;
      }
      &:hover{
        &:after {
          opacity: 1;
          background: #12131B;
        }
      }
      &:active{
        background: #030303;
				&:before {
          opacity: 1;
        }
      }
      &:disabled{
        background: #050505;
        border: 1px #272A30 solid;
        pointer-events: none;
        opacity: 0.3;
      }
    }

	}

  .animate-updated-button button{
    transform: scale(1);
    transition: all 0.5s ease;
  }

  .animate-updated-button:hover button:not(:disabled)  {
    transform: scale(0.9);
  }

  .animate-updated-button:not(:hover) button {
    transform: scale(1);
  }
</style>
