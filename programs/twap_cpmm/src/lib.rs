use anchor_lang::prelude::*;
use anchor_spl::token::Mint;

declare_id!("E4JnykRAH6FsFXeaKTyax3bBvPp8dnQXjcuFhakCQyth");

#[account]
pub struct Market {
    pub base: Pubkey,
    pub quote: Pubkey,
}

#[program]
pub mod twap_cpmm {
    use super::*;

    pub fn init_market(ctx: Context<InitializeMarket>) -> Result<()> {
        let market = &mut ctx.accounts.market;

        market.base = ctx.accounts.base.key();
        market.quote = ctx.accounts.quote.key();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    pub base: Account<'info, Mint>,
    pub quote: Account<'info, Mint>,
    #[account(
        init,
        payer = payer,
        space = 8 + 32 + 32,
        seeds = [b"WWCACOTMICMIBMHAFTTWYGHMB"], // abbreviation of the last two sentences of the Declaration of Independence of Cyberspace
        bump
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    //#[account(mint::decimals = 9)]
}
