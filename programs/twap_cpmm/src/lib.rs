use anchor_lang::prelude::*;

declare_id!("E4JnykRAH6FsFXeaKTyax3bBvPp8dnQXjcuFhakCQyth");

#[program]
pub mod twap_cpmm {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
