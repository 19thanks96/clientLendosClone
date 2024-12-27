<script lang="ts">
    export let first = "Mission";
    export let second:string = 'Completed'

    let textStyle = ` font-family: 'Poppins'; font-style: italic; font-weight: 700; font-size: 42px; line-height: 1; text-align: center; letter-spacing: 0.01em; text-transform: uppercase; color: #E9E9E9;`
</script>

<div class="absolute mt-[2.8%] port:mt-[12%] w-full  lex flex-col  justify-center items-center ">
    <div style={textStyle} class="" >{first}</div>

    <div style={textStyle} class="block">{second}</div>

</div>

<style lang="scss">
</style>